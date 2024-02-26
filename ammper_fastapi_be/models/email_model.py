from typing import Optional
from pydantic import BaseModel


class Email(BaseModel):
    from_email: str
    to_email: str
    subject: str
    message: str
