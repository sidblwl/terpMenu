from fastapi import APIRouter
from config import collection_name
from models import Review
from schemas import review_serializer, reviews_serializer
from bson import ObjectId
import json

menu_api_router = APIRouter()

@menu_api_router.get("/review")
async def get_reviews():
    reviews = reviews_serializer(collection_name.find())
    
    with open('menus.json', 'r') as mf:
        menus = json.load(mf)

    # Traverse through the menu items and update the reviews
    for diningHall, sections in menus.items():
        for section, items in sections.items():
            for item in items:
                item_name = item['name']

                for review_item in reviews:
                    if review_item['diningHall'] == diningHall:
                        if review_item['section'] == section:
                            if review_item['menuItem'] == item_name:
                                toAppend = True
                                for review in item['reviews']:
                                    if(review['id'] == review_item['id']):
                                        toAppend = False
                                if toAppend:
                                    item['reviews'].append(review_item)

                ratingSum = 0
                numRatings = 0
                for review in item['reviews']:
                    ratingSum += review['rating']
                    numRatings += 1
                if numRatings > 0:
                    newRating = ratingSum/numRatings
                    item['rating'] = newRating
                

    with open('menus.json', 'w') as of:
        json.dump(menus, of, indent=4)

    return {"status": "ok", "data": reviews}

@menu_api_router.get("/review/{id}")
async def get_review(id: str):
    review = reviews_serializer(collection_name.find({"_id": ObjectId(id)}))
    return {"status": "ok", "data": review}

@menu_api_router.post("/review")
async def post_review(review: Review):
    _id = collection_name.insert_one(dict(review))
    review = reviews_serializer(collection_name.find({"_id": _id.inserted_id}))
    return {"status": "ok", "data": review}

@menu_api_router.put("/review/{id}")
async def update_review(id: str, review: Review):
    collection_name.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(review)
    })
    review = reviews_serializer(collection_name.find({"_id": ObjectId(id)}))
    return {"status": "ok", "data": review}

@menu_api_router.delete("/review/{id}")
async def delete_review(id: str):
    collection_name.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "ok", "data": []}