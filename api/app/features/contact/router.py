from datetime import UTC, datetime
from functools import lru_cache
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status

from app.core.config import Settings, get_settings
from app.core.rate_limit import SlidingWindowRateLimiter
from app.features.contact.notifier import EmailNotifier
from app.features.contact.repository import ContactRepository
from app.features.contact.schemas import ContactMessageIn, ContactMessageOut
from app.features.contact.service import ContactService

router = APIRouter(prefix="/contact", tags=["contact"])


@lru_cache
def get_rate_limiter() -> SlidingWindowRateLimiter:
    settings = get_settings()
    return SlidingWindowRateLimiter(
        max_requests=settings.rate_limit_requests,
        window_seconds=settings.rate_limit_window_seconds,
    )


def get_contact_service(settings: Annotated[Settings, Depends(get_settings)]) -> ContactService:
    return ContactService(ContactRepository(settings.database_path), EmailNotifier(settings))


def get_client_ip(request: Request) -> str | None:
    # The Next.js server forwards the visitor's IP; fall back to the socket peer.
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else None


@router.post("", status_code=status.HTTP_201_CREATED, response_model=ContactMessageOut)
def submit_contact_message(
    payload: ContactMessageIn,
    request: Request,
    background: BackgroundTasks,
    service: Annotated[ContactService, Depends(get_contact_service)],
    limiter: Annotated[SlidingWindowRateLimiter, Depends(get_rate_limiter)],
) -> ContactMessageOut:
    client_ip = get_client_ip(request)
    if not limiter.allow(client_ip or "unknown"):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many messages. Please try again later.",
        )

    if payload.website:
        # Honeypot tripped: report success so bots learn nothing, but store nothing.
        return ContactMessageOut(id=0, received_at=datetime.now(UTC))

    return service.submit(payload, client_ip, background)
