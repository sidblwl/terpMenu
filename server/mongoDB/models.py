from pydantic import BaseModel

class Review(BaseModel):
    menuItem: str
    section: str
    diningHall: str
    name: str
    date: str
    rating: int
    text: str
