from fastapi import FastAPI, Header
app = FastAPI()
from pydantic import BaseModel  #Base class for any class whose objects are used as input to a http request
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
import json
from fileManagement import update_menu_with_reviews

diningHalls = ["North", "Y", "South"]

fluff = ["Bacon Bits", "Diced Ham", "Diced Green Peppers", "Diced Onions", "Maple Syrup", "Shredded Cheddar Cheese", "Sliced Mushroom", "Spinach", "Tomatoes Diced", "Butter", "Ham Sliced", "Maple Syrup", "Mayonnaise", "Provolone Cheese Sliced", "Roasted Carrots and Red Onions", "Sliced Pepper Jack Cheese", "Sliced Roma Tomatoes", "Sugar Snap Peas and Red Peppers (purple)", "Turkey Sliced", "Balsamic Dressing", "Banana Peppers", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Kale", "Cran Raisin", "Cucumber", "Diced Green Peppers", "Edamame", "Garbanzo Beans", "Guacamole", "Hummus", "Mixed Greens", "Potato Hamburger Roll", "Pumpkin Seeds", "Red Beans", "Red Pepper", "Shredded Carrots", "Sliced Jalapeno Peppers", "Sliced Mushroom", "Sliced Red Onion", "Sliced Roma Tomatoes", "Sourdough Bread", "Spinach", "Vegan Chipotle Mayonnaise", "Vegan Cream Cheese", "Vegan Mayonnaise", "Vegan Shredded Cheddar Cheese", "Vegan Shredded Pepper Jack Cheese", "Vegan Sliced Gouda Cheese", "Vegan Sliced Provolone Cheese", "Vegan Sour Cream", "Whole Grain Bread", "American Cheese Sliced", "Chipotle Mayonnaise", "Creamy Cole Slaw", "Dijon Mustard", "Fresh Bread Butter Pickles", "Fresh Dill Pickles", "Leaf Lettuce", "Mayonnaise", "Pullman Wheat Bread Sliced", "Sliced Red Onion", "Sliced Tomatoes", "Spicy Brown Mustard", "Turkey Sliced", "Chopped Cilantro", "Cotija Cheese", "Fresh Roasted Carrots", "Fresh Steamed Broccoli", "Fresh Steamed Green Beans", "Guacamole", "Lime Wedges", "Pickled Red Onions", "Pico de Gallo", "Salsa Roja", "Salsa Verde", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Shredded Lettuce", "Sliced Jalapeno Peppers", "Sour Cream", "Hummus", "Marinated Cucumbers", "Marinated Grape Tomatoes", "Pickled Onions", "Red pepper Hummus", "Balsamic Dressing", "Balsamic Vinegar", "Blue Cheese Dressing", "Caesar Dressing", "Chopped Green Onions", "Chopped Kale", "Chopped Lettuce", "Chopped Romaine", "Corn", "Cottage Cheese", "Cran Raisin", "Crouton", "Cucumber", "Diced Green Pepper", "Eggs", "FF Italian", "Fried Shallot", "Garbanzo Beans", "Grapes", "Grated Parmesan Cheese", "Lite Soy Sauce", "Mixed Greens", "Oatmeal", "Olive Oil", "Oyster Crackers", "Peas", "Raisins", "Ranch Dressing", "Red Beans", "Red Pepper", "Red Wine Vinegar", "Roasted Corn", "Shredded Carrots", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Sliced Black Olives", "Sliced Lemons", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sunflower Seeds", "Thousand Island Dressing", "Tomatoes Diced", "Bagels", "Blueberry Muffin", "Butter", "Chocolate Muffin", "Cinnamon Scone", "Donuts", "M&M Pieces", "Maple Syrup", "Margarine", "Mini Croissant", "Oreo Pieces", "Plain Cream Cheese", "Rainbow Sprinkles", "Strawberry Topping", "Waffle", "Whipped Cream", "Alfredo Sauce", "Marinara Sauce", "Mushroom Bruschetta", "Tomato Bruschetta", "Baby Corn", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Basil", "Chopped Cilantro", "Chopped Garlic", "Chopped Ginger", "Chopped Green Onions", "Chow Mein Ramen Noodles", "Diced Green Pepper", "Edamame", "Fried Rice", "General Tso's Sauce", "Green Beans", "Orange Sauce", "Shredded Cabbage", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sticky Rice", "Sugar Snap Peas", "Sweet Sour Sauce (RTU)", "Teriyaki Sauce", "Water Chestnuts", "Parmesan Tomatoes and Button Mushrooms", "Roasted Carrots and Red Onions", "Grated Parmesan Cheese", "Ham Sliced", "Mayonnaise", "Provolone Cheese Sliced", "Sliced Pepper Jack Cheese", "Sliced Roma Tomatoes", "Sugar Snap Peas and Red Peppers (purple)", "Turkey Sliced", "Balsamic Dressing", "Balsamic Garlic Roasted Brussel Sprouts", "Banana Peppers", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Kale", "Cran Raisin", "Cucumber", "Diced Green Peppers", "Edamame", "Garbanzo Beans", "Guacamole", "Hummus", "Potato Hamburger Roll", "Pumpkin Seeds", "Red Beans", "Red Pepper", "Roasted Garlic Sweet Potato", "Shredded Carrots", "Sliced Jalapeno Peppers", "Sliced Mushroom", "Sliced Red Onion", "Sliced Roma Tomatoes", "Sourdough Bread", "Spinach Tortilla 12\"", "Spinach", "Sticky Rice", "Vegan Chipotle Mayonnaise", "Vegan Mayonnaise", "Vegan Shredded Cheddar Cheese", "Vegan Shredded Pepper Jack Cheese", "Vegan Sliced Gouda Cheese", "Vegan Sliced Provolone Cheese", "Whole Grain Bread", "American Cheese Sliced", "BBQ Sauce", "Chipotle Mayonnaise", "Dijon Mustard", "Fresh Bread Butter Pickles", "Fresh Dill Pickles", "Leaf Lettuce", "Mayonnaise", "Pullman Wheat Bread Sliced", "Sliced Red Onion", "Sliced Tomatoes", "Spicy Brown Mustard", "Turkey Sliced", "Cuban Black Bean and Rice", "Chopped Cilantro", "Cotija Cheese", "Guacamole", "Lime Wedges", "Pico de Gallo", "Queso Blanco", "Salsa Roja", "Salsa Verde", "Shredded Jack Cheedar Cheese", "Shredded Lettuce", "Sliced Jalapeno Peppers", "Sour Cream", "Tortilla Chip", "Hummus", "Pickled Onions", "Red pepper Hummus", "Artichoke Hearts", "Balsamic Dressing", "Balsamic Vinegar", "Black Beans", "Blue Cheese Dressing", "Broccoli", "Caesar Dressing", "Chopped Kale", "Chopped Lettuce", "Chopped Romaine", "Chow Mein Noodles", "Corn", "Cran Raisin", "Crouton", "Cucumber", "Diced Green Pepper", "Eggs", "FF Italian", "Fresh Blueberry", "Fresh Strawberry", "Garbanzo Beans", "Garlic Chili Butternut Squash and Red Onions", "Grapes", "Grated Parmesan Cheese", "Mixed Greens", "Olive Oil", "Oyster Crackers", "Peaches in syrup", "Pears in syrup", "Peas", "Pineapple", "Plain Tuna", "Raisins", "Ranch Dressing", "Red Beans", "Red Pepper", "Red Wine Vinegar", "Shredded Carrots", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Sliced Black Olives", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sunflower Seeds", "Thousand Island Dressing", "Tomatoes Diced", "Alfredo Sauce", "Kale Caesar Salad", "Marinara Sauce", "Baby Corn", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Basil", "Chopped Cilantro", "Chopped Garlic", "Chopped Ginger", "Chopped Green Onions", "Chow Mein Ramen Noodles", "Diced Green Pepper", "Edamame", "Fried Rice", "General Tso's Sauce", "Green Beans", "Orange Sauce", "Shredded Cabbage", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sticky Rice", "Sugar Snap Peas", "Sweet Sour Sauce (RTU)", "Teriyaki Sauce", "Water Chestnuts"]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

photos = {"American Grilled Cheese Sandwich": "public/grilledCheese.jpeg", "BBQ Chicken Pepperjack Grilled Cheese Sandwich": "public/bbqChicken.jpeg"}

def calcRatings():
    with open("reviews.json", 'r') as rf:
        reviews = json.load(rf)
    for hall_reviews, sections_reviews in reviews.items():
        for section_reviews, items_reviews in sections_reviews.items():
            for review_item in items_reviews:
                ratingSum = 0
                numRatings = 0
                for review in review_item["reviews"]:
                    ratingSum += review["rating"]
                    numRatings += 1
                if(numRatings != 0):
                    review_item["rating"] = ratingSum/numRatings
                else:
                    review_item["rating"] = 0

    json_object = json.dumps(reviews, indent=4)
    with open("reviews.json", "w") as outfile:
        outfile.write(json_object)

# This function scrapes the menu on the UMD dining hall website 

def getMenu(num):
    ySections = ["Breakfast", "Good Food Gluten Free", "Sprouts", "Terp Comfort", "Salad Bar","Maryland Bakery", "Mezza", "Joe's Grill", "Terp Grain Bowl", "Woks"]
    northSections = ["Smash Burger", "Harvest Greens", "Harvest Vegan-LUNCH", "Purple Zone", "Purple Zone-ALL DAY",  "Smash Deli", "Ciao All-Day", "Ciao Chilled Salads", "Ciao Pizza", "Ciao Pasta", "Ciao Entree", "Chef's Table Mains", "Chef's Table Extras",  "Chef's Table Vegetarian", "Halal at Chef's Table", "Harvest Entree", "Soups", "Scoops Homemade Ice Cream"]
    southSections = ["Broiler Works", "Grill Works", "Chef's Table", "Salad Bar", "Waffle, Doughnut, Bagel Bar", "Purple Zone", "Roaster", "Pasta", "Pizza", "Soup Du Jour", "Deli+", "Deli", "Roma Vegan Salads and Panini", "Vegan Desserts", "Mongolian Grill", "Mongolian Grill Made to Ord"]
    url = "https://nutrition.umd.edu/?locationNum=" + str(num) + "&dtdate=9/3/2023"
    # url = "https://nutrition.umd.edu/?locationNum=" + str(num)
    page = requests.get(url)
    parser = BeautifulSoup(page.text, "html.parser")
    items = (parser.find_all("a", class_="menu-item-name"))
    dietaryRestrictions = (parser.find_all("img", class_="nutri-icon"))


    #list of all card bodies
    stations = (parser.find_all("div", class_="card-body"))

    #list to filter out repeated stations
    listed = [str]

    #menus dictionary
    menus = {}

    #for each card body
    for station in stations:
        #find station name
        stationName = (station.find("h5", class_="card-title"))
        #make sure station name is not part of the sides
        if "Sides" not in stationName.text and stationName.text not in listed:
            #get all items including fluff
            allItemRows = (station.find_all("div", class_="row menu-item-row"))
            allItems = []
            for itemRow in allItemRows:
                item = {}
                item["name"] = itemRow.find("a", class_="menu-item-name").text 
                if item["name"] not in fluff:
                    itemTagsHTML = itemRow.find_all("img", class_="nutri-icon")
                    itemTags = []
                    for tag in itemTagsHTML:
                        itemTags.append(tag.get("title"))
                    itemTags.append("Show All")
                    item["tags"] = itemTags
                    if(item["name"] in photos):
                        item["image"] = photos[item["name"]]
                    else:
                        item["image"] = "none.jpg"
                    item["reviews"] = []
                    item["rating"] = 0
                    # review = {"rating": 4, "name": "Anonymous", "date": "06/13/24", "text":"this food is yum diddly scrumptious"}
                    # review2 = {"rating": 2, "name": "Anonymous", "date": "06/13/24", "text":"lowkey mid"}
                    # # item["reviews"].append(review)
                    # # item["reviews"].append(review2)
                    allItems.append(item)
                    menus[stationName.text.strip()] = allItems

    return menus

# Setup that runs at the start of the server
# Scrapes the data and puts into the menus dictionary. Then writes menu to a json file

menus = {}
reviews = {}
menus["North"] = getMenu(51)
menus["Y"] = (getMenu(19))
menus["South"] = (getMenu(16))

json_object = json.dumps(menus, indent=4)
 
# Writing to sample.json
with open("menus.json", "w") as outfile:
    outfile.write(json_object)

menus_file = 'menus.json'
reviews_file = 'reviews.json'
output_file = 'menus.json'
for diningHall in diningHalls:
    update_menu_with_reviews(menus_file, reviews_file, output_file, diningHall)

class Review(BaseModel):
    hall: str
    station: str
    itemName: str
    rating: int
    name: str
    date: str
    text: str

@app.get('/menu0')
async def root():
    update_menu_with_reviews(menus_file, reviews_file, output_file, "North")
    with open('menus.json') as json_file:
        menus = json.load(json_file)
    return menus["North"]

@app.get('/menu1')
async def root():
    update_menu_with_reviews(menus_file, reviews_file, output_file, "Y")
    with open('menus.json') as json_file:
        menus = json.load(json_file)
    return menus["Y"]

@app.get('/menu2')
async def root():
    update_menu_with_reviews(menus_file, reviews_file, output_file, "South")
    with open('menus.json') as json_file:
        menus = json.load(json_file)
    return menus["South"]

@app.post('/addReview')
async def add_item(review: Review):
    reviewToAdd = {"rating": review.rating, "name": review.name, "date": review.date, "text": review.text}
    with open('reviews.json') as json_file:
        reviews = json.load(json_file)
    for item in reviews[review.hall][review.station]:
        if(item["name"] == review.itemName):
            item["reviews"].append(reviewToAdd)
    json_object = json.dumps(reviews, indent=4)
    with open("reviews.json", "w") as outfile:
        outfile.write(json_object)
    calcRatings()
    return {'message': 'success'}

@app.delete('/clearReviews')
async def clear_reviews():
    with open('reviews.json') as json_file:
        reviews = json.load(json_file)
    for hall_reviews, sections_reviews in reviews.items():
                for section_reviews, items_reviews in sections_reviews.items():
                    for review_item in items_reviews:
                            review_item['reviews'] = []
                            review_item['rating'] = 0
    json_object = json.dumps(reviews, indent=4)
    with open("reviews.json", "w") as outfile:
        outfile.write(json_object)
    return {'message': 'success'}


    
