# Takes in a review and returns it as a dictionary 

def review_serializer(review) -> dict:
    return {
        "id": str(review["_id"]),
        "menuItem": review["menuItem"],
        "diningHall": review["diningHall"],
        "section": review["section"],
        "name": review["name"],
        "date": review["date"],
        "rating": review["rating"],
        "text": review["text"]
    }

# Takes all of the reviews, turn them into dictionaries and returns them as a list

def reviews_serializer(reviews) -> list:
    return [review_serializer(review) for review in reviews]

def menuItem_serializer(menuItem) -> dict:
    return {
        "id": str(menuItem["_id"]),
        "name": menuItem["name"],
        "imagePath": menuItem["imagePath"]
    }

def menuItems_serializer(menuItems) -> dict:
    return [menuItem_serializer(menuItem) for menuItem in menuItems]