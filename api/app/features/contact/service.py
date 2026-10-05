from fastapi import BackgroundTasks

from app.features.contact.notifier import EmailNotifier
from app.features.contact.repository import ContactRepository
from app.features.contact.schemas import ContactMessageIn, ContactMessageOut


class ContactService:
    def __init__(self, repository: ContactRepository, notifier: EmailNotifier) -> None:
        self._repository = repository
        self._notifier = notifier

    def submit(
        self,
        payload: ContactMessageIn,
        client_ip: str | None,
        background: BackgroundTasks,
    ) -> ContactMessageOut:
        message_id, received_at = self._repository.save(payload, client_ip)
        # Send the email after the response so the visitor never waits on SMTP.
        background.add_task(self._notifier.send, payload)
        return ContactMessageOut(id=message_id, received_at=received_at)
