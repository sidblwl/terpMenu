from fastapi import FastAPI, Header
app = FastAPI()
from pydantic import BaseModel  #Base class for any class whose objects are used as input to a http request
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
import json

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
                    item["tags"] = itemTags
                    if(item["name"] in photos):
                        item["image"] = photos[item["name"]]
                    else:
                        item["image"] = "none.jpg"
                    item["reviews"] = []
                    # review = {"rating": 4, "name": "Anonymous", "date": "06/13/24", "text":"this food is yum diddly scrumptious"}
                    # review2 = {"rating": 2, "name": "Anonymous", "date": "06/13/24", "text":"lowkey mid"}
                    # item["reviews"].append(review)
                    # item["reviews"].append(review2)
                    allItems.append(item)
                    menus[stationName.text.strip()] = allItems

    return menus

menus = {}
menus["North"] = getMenu(51)
menus["Y"] = (getMenu(19))
menus["South"] = (getMenu(16))

json_object = json.dumps(menus, indent=4)
 
# Writing to sample.json
with open("reviews.json", "w") as outfile:
    outfile.write(json_object)

class Review(BaseModel):
    hall: str
    station: str
    index: int
    rating: int
    name: str
    date: str
    text: str

@app.get('/menu0')
async def root():
# Opening JSON file
    with open('reviews.json') as json_file:
        menus = json.load(json_file)
    return menus["North"]

@app.get('/menu1')
async def root():
    with open('reviews.json') as json_file:
        menus = json.load(json_file)
    return menus["Y"]

@app.get('/menu2')
async def root():
    with open('reviews.json') as json_file:
        menus = json.load(json_file)
    return menus["South"]

@app.post('/addReview')
async def add_item(review: Review):
    reviewToAdd = {"rating": review.rating, "name": review.name, "date": review.date, "text": review.text}
    with open('reviews.json') as json_file:
        menus = json.load(json_file)
    menus[review.hall][review.station][review.index]["reviews"].append(reviewToAdd)
    json_object = json.dumps(menus, indent=4)
    with open("reviews.json", "w") as outfile:
        outfile.write(json_object)
    return {'message': 'success'}

# @app.get('/menu/{num}')
# async def root(num: int = None):
#     return getMenu(num)



    
