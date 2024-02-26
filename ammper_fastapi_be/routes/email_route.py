from fastapi import APIRouter, HTTPException
from models.email_model import Email
from dotenv import load_dotenv
import os
import boto3

load_dotenv()

print(os.getenv("REGION_NAME_AWS"))

email_sender = APIRouter()
pinpoint = boto3.client('pinpoint', region_name=os.getenv("REGION_NAME_AWS"))


@email_sender.post('/email-sender')
async def send_email(email: Email):
    new_email = dict(email)

    try:
        message = {

            'Addresses': {
                new_email["to_email"]: {
                    'ChannelType': 'EMAIL'
                }
            },
            'MessageConfiguration': {
                'EmailMessage': {
                    'FromAddress': new_email["from_email"],
                    'SimpleEmail': {
                        'Subject': {
                            'Charset': 'UTF-8',
                            'Data': new_email["subject"],
                        },
                        'HtmlPart': {
                            'Charset': 'UTF-8',
                            'Data': f"{new_email['message']}<a href='https://64f12f3726c222051bbb80fd--portfolio-castrodiegojose.netlify.app/'>Mi Portfolio</a>",

                        }
                    }
                }
            }
        }

        response = pinpoint.send_messages(
            ApplicationId=os.getenv('APP_ID_AWS'),
            MessageRequest=message
        )

        return "Enviado Correctamente"

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@email_sender.get('/email-sender/kpi')
def kpi_email():
    emails_opened = pinpoint.get_application_date_range_kpi(
        ApplicationId=os.getenv('APP_ID_AWS'),
        KpiName='txn-emails-opened',
    )

    emails_clicked = pinpoint.get_application_date_range_kpi(
        ApplicationId=os.getenv('APP_ID_AWS'),
        KpiName='txn-emails-clicked',
    )

    emails_bounced = pinpoint.get_application_date_range_kpi(
        ApplicationId=os.getenv('APP_ID_AWS'),
        KpiName='txn-emails-hard-bounced',
    )

    response = {
        "opened": emails_opened['ApplicationDateRangeKpiResponse']['KpiResult']['Rows'][0]['Values'][0]['Value'],
        "clicked": emails_clicked['ApplicationDateRangeKpiResponse']['KpiResult']['Rows'][0]['Values'][0]['Value'],
        "rejected": emails_bounced['ApplicationDateRangeKpiResponse']['KpiResult']['Rows'][0]['Values'][0]['Value']
        if emails_bounced['ApplicationDateRangeKpiResponse']['KpiResult']['Rows'] else None
    }

    return response
