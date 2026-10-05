import sqlite3
from contextlib import closing
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING, Protocol

from app.core.config import Settings
from app.features.contact.schemas import ContactMessageIn

if TYPE_CHECKING:
    import psycopg


class ContactRepository(Protocol):
    """Somewhere durable to keep contact messages."""

    def save(self, payload: ContactMessageIn, client_ip: str | None) -> tuple[int, datetime]: ...

    def count(self) -> int: ...


_SQLITE_SCHEMA = """
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


class SqliteContactRepository:
    """Stores messages in a local SQLite file — used for local development and tests."""

    def __init__(self, db_path: Path) -> None:
        self._db_path = db_path
        self._db_path.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as conn, conn:
            conn.execute(_SQLITE_SCHEMA)

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


_POSTGRES_SCHEMA = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    subject     TEXT NOT NULL,
    message     TEXT NOT NULL,
    client_ip   TEXT,
    received_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
"""

# Tracks which databases already have the table, so it is only created once per process.
_postgres_ready: set[str] = set()


class PostgresContactRepository:
    """Stores messages in Postgres (Neon on Vercel). Connects per call, which suits serverless."""

    def __init__(self, database_url: str) -> None:
        self._url = database_url
        if database_url not in _postgres_ready:
            with self._connect() as conn:
                conn.execute(_POSTGRES_SCHEMA)
            _postgres_ready.add(database_url)

    def _connect(self) -> "psycopg.Connection":
        import psycopg  # imported lazily so local SQLite setups never need it

        return psycopg.connect(self._url, connect_timeout=10)

    def save(self, payload: ContactMessageIn, client_ip: str | None) -> tuple[int, datetime]:
        with self._connect() as conn:
            row = conn.execute(
                "INSERT INTO contact_messages (name, email, subject, message, client_ip) "
                "VALUES (%s, %s, %s, %s, %s) RETURNING id, received_at",
                (payload.name, str(payload.email), payload.subject, payload.message, client_ip),
            ).fetchone()
        assert row is not None
        return int(row[0]), row[1]

    def count(self) -> int:
        with self._connect() as conn:
            row = conn.execute("SELECT COUNT(*) FROM contact_messages").fetchone()
        return int(row[0]) if row else 0


def create_repository(settings: Settings) -> ContactRepository:
    """Postgres when a database URL is configured (Vercel + Neon), otherwise local SQLite."""
    if settings.database_url:
        return PostgresContactRepository(settings.database_url)
    return SqliteContactRepository(settings.database_path)
