def emailEntity(item) -> dict:
    return {
        "from_email": item["from_email"],
        "to_email": item["to_email"],
        "subject": item["subject"],
        "message": item["message"]
    }
