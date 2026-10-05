import logging
import smtplib
from email.message import EmailMessage

from app.core.config import Settings
from app.features.contact.schemas import ContactMessageIn

logger = logging.getLogger(__name__)


class EmailNotifier:
    """Forwards contact messages to the site owner's inbox over SMTP."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def send(self, payload: ContactMessageIn) -> None:
        if not self._settings.email_enabled:
            return

        email = EmailMessage()
        email["Subject"] = f"[Portfolio] {payload.subject}"
        email["From"] = self._settings.smtp_from or self._settings.smtp_username
        email["To"] = self._settings.contact_inbox
        email["Reply-To"] = str(payload.email)
        email.set_content(f"From: {payload.name} <{payload.email}>\n\n{payload.message}")

        host, port = self._settings.smtp_host, self._settings.smtp_port
        try:
            with smtplib.SMTP(host, port, timeout=10) as smtp:
                smtp.starttls()
                if self._settings.smtp_username:
                    smtp.login(self._settings.smtp_username, self._settings.smtp_password)
                smtp.send_message(email)
        except (smtplib.SMTPException, OSError):
            # The message is already stored, so a mail failure must not fail the request.
            logger.exception("Failed to forward contact message by email")
