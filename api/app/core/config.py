import os
from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


def _default_database_path() -> Path:
    # Vercel functions can only write to /tmp, and /tmp does not outlive the
    # instance. Point DATABASE_PATH (or email forwarding) somewhere durable there.
    if os.environ.get("VERCEL"):
        return Path("/tmp/portfolio/messages.db")
    return Path("data/messages.db")


class Settings(BaseSettings):
    """Application settings, loaded from environment variables or a .env file."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    cors_origins: str = "http://localhost:3000"
    database_path: Path = _default_database_path()
    rate_limit_requests: int = 5
    rate_limit_window_seconds: int = 600

    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from: str = ""
    contact_inbox: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def email_enabled(self) -> bool:
        return bool(self.smtp_host and self.contact_inbox)


@lru_cache
def get_settings() -> Settings:
    return Settings()
