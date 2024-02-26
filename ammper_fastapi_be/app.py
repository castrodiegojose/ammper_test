from fastapi import FastAPI
from routes.email_route import email_sender
from fastapi.middleware.cors import CORSMiddleware
import boto3


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(email_sender)
