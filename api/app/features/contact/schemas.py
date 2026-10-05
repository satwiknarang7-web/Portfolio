from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactMessageIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    # Honeypot: hidden from real visitors, bots tend to fill it in.
    website: str = Field(default="", max_length=200)

    @field_validator("name", "subject")
    @classmethod
    def single_line(cls, value: str) -> str:
        # Blocks header injection, since these values end up in email headers.
        if "\n" in value or "\r" in value:
            raise ValueError("must be a single line")
        return value


class ContactMessageOut(BaseModel):
    id: int
    received_at: datetime
    detail: str = "Thanks! Your message has been received."
