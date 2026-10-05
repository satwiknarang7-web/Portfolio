import sqlite3
from contextlib import closing
from datetime import UTC, datetime
from pathlib import Path

from app.features.contact.schemas import ContactMessageIn

_SCHEMA = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    subject     TEXT NOT NULL,
    message     TEXT NOT NULL,
    client_ip   TEXT,
    received_at TEXT NOT NULL
)
"""


class ContactRepository:
    """Persists contact messages to SQLite."""

    def __init__(self, db_path: Path) -> None:
        self._db_path = db_path
        self._db_path.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as conn, conn:
            conn.execute(_SCHEMA)

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self._db_path)

    def save(self, payload: ContactMessageIn, client_ip: str | None) -> tuple[int, datetime]:
        received_at = datetime.now(UTC)
        with closing(self._connect()) as conn, conn:
            cursor = conn.execute(
                "INSERT INTO contact_messages "
                "(name, email, subject, message, client_ip, received_at) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (
                    payload.name,
                    str(payload.email),
                    payload.subject,
                    payload.message,
                    client_ip,
                    received_at.isoformat(),
                ),
            )
            return int(cursor.lastrowid or 0), received_at

    def count(self) -> int:
        with closing(self._connect()) as conn:
            return int(conn.execute("SELECT COUNT(*) FROM contact_messages").fetchone()[0])
