from collections.abc import Iterator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings, get_settings
from app.core.rate_limit import SlidingWindowRateLimiter
from app.features.contact.repository import SqliteContactRepository
from app.features.contact.router import get_rate_limiter
from app.main import create_app

VALID_PAYLOAD = {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "subject": "Collaboration",
    "message": "Loved your portfolio, let's build something together!",
}


@pytest.fixture
def settings(tmp_path: Path) -> Settings:
    return Settings(
        database_path=tmp_path / "test.db", database_url="", smtp_host="", contact_inbox=""
    )


@pytest.fixture
def client(settings: Settings) -> Iterator[TestClient]:
    app = create_app()
    app.dependency_overrides[get_settings] = lambda: settings
    limiter = SlidingWindowRateLimiter(max_requests=2, window_seconds=60)
    app.dependency_overrides[get_rate_limiter] = lambda: limiter
    with TestClient(app) as test_client:
        yield test_client


def test_health(client: TestClient) -> None:
    assert client.get("/api/health").json() == {"status": "ok"}


def test_valid_message_is_stored(client: TestClient, settings: Settings) -> None:
    response = client.post("/api/contact", json=VALID_PAYLOAD)

    assert response.status_code == 201
    assert response.json()["id"] == 1
    assert SqliteContactRepository(settings.database_path).count() == 1


@pytest.mark.parametrize(
    "override",
    [
        {"email": "not-an-email"},
        {"message": "short"},
        {"name": "A"},
        {"subject": "Hi\nBcc: victim@example.com"},
    ],
)
def test_invalid_message_is_rejected(client: TestClient, override: dict[str, str]) -> None:
    response = client.post("/api/contact", json={**VALID_PAYLOAD, **override})
    assert response.status_code == 422


def test_honeypot_is_silently_dropped(client: TestClient, settings: Settings) -> None:
    response = client.post("/api/contact", json={**VALID_PAYLOAD, "website": "spam.example"})

    assert response.status_code == 201
    assert SqliteContactRepository(settings.database_path).count() == 0


def test_rate_limit(client: TestClient) -> None:
    statuses = [client.post("/api/contact", json=VALID_PAYLOAD).status_code for _ in range(3)]
    assert statuses == [201, 201, 429]
