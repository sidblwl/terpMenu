from fastapi import FastAPI
from .routes import menu_api_router, get_menuItems
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
import json

# Create the fastapi object and add the router to it
app = FastAPI()
app.include_router(menu_api_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

fluff = ["Bacon Bits", "Diced Ham", "Diced Green Peppers", "Diced Onions", "Maple Syrup", "Shredded Cheddar Cheese", "Sliced Mushroom", "Spinach", "Tomatoes Diced", "Butter", "Ham Sliced", "Maple Syrup", "Mayonnaise", "Provolone Cheese Sliced", "Roasted Carrots and Red Onions", "Sliced Pepper Jack Cheese", "Sliced Roma Tomatoes", "Sugar Snap Peas and Red Peppers (purple)", "Turkey Sliced", "Balsamic Dressing", "Banana Peppers", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Kale", "Cran Raisin", "Cucumber", "Diced Green Peppers", "Edamame", "Garbanzo Beans", "Guacamole", "Hummus", "Mixed Greens", "Potato Hamburger Roll", "Pumpkin Seeds", "Red Beans", "Red Pepper", "Shredded Carrots", "Sliced Jalapeno Peppers", "Sliced Mushroom", "Sliced Red Onion", "Sliced Roma Tomatoes", "Sourdough Bread", "Spinach", "Vegan Chipotle Mayonnaise", "Vegan Cream Cheese", "Vegan Mayonnaise", "Vegan Shredded Cheddar Cheese", "Vegan Shredded Pepper Jack Cheese", "Vegan Sliced Gouda Cheese", "Vegan Sliced Provolone Cheese", "Vegan Sour Cream", "Whole Grain Bread", "American Cheese Sliced", "Chipotle Mayonnaise", "Creamy Cole Slaw", "Dijon Mustard", "Fresh Bread Butter Pickles", "Fresh Dill Pickles", "Leaf Lettuce", "Mayonnaise", "Pullman Wheat Bread Sliced", "Sliced Red Onion", "Sliced Tomatoes", "Spicy Brown Mustard", "Turkey Sliced", "Chopped Cilantro", "Cotija Cheese", "Fresh Roasted Carrots", "Fresh Steamed Broccoli", "Fresh Steamed Green Beans", "Guacamole", "Lime Wedges", "Pickled Red Onions", "Pico de Gallo", "Salsa Roja", "Salsa Verde", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Shredded Lettuce", "Sliced Jalapeno Peppers", "Sour Cream", "Hummus", "Marinated Cucumbers", "Marinated Grape Tomatoes", "Pickled Onions", "Red pepper Hummus", "Balsamic Dressing", "Balsamic Vinegar", "Blue Cheese Dressing", "Caesar Dressing", "Chopped Green Onions", "Chopped Kale", "Chopped Lettuce", "Chopped Romaine", "Corn", "Cottage Cheese", "Cran Raisin", "Crouton", "Cucumber", "Diced Green Pepper", "Eggs", "FF Italian", "Fried Shallot", "Garbanzo Beans", "Grapes", "Grated Parmesan Cheese", "Lite Soy Sauce", "Mixed Greens", "Oatmeal", "Olive Oil", "Oyster Crackers", "Peas", "Raisins", "Ranch Dressing", "Red Beans", "Red Pepper", "Red Wine Vinegar", "Roasted Corn", "Shredded Carrots", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Sliced Black Olives", "Sliced Lemons", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sunflower Seeds", "Thousand Island Dressing", "Tomatoes Diced", "Bagels", "Blueberry Muffin", "Butter", "Chocolate Muffin", "Cinnamon Scone", "Donuts", "M&M Pieces", "Maple Syrup", "Margarine", "Mini Croissant", "Oreo Pieces", "Plain Cream Cheese", "Rainbow Sprinkles", "Strawberry Topping", "Waffle", "Whipped Cream", "Alfredo Sauce", "Marinara Sauce", "Mushroom Bruschetta", "Tomato Bruschetta", "Baby Corn", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Basil", "Chopped Cilantro", "Chopped Garlic", "Chopped Ginger", "Chopped Green Onions", "Chow Mein Ramen Noodles", "Diced Green Pepper", "Edamame", "Fried Rice", "General Tso's Sauce", "Green Beans", "Orange Sauce", "Shredded Cabbage", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sticky Rice", "Sugar Snap Peas", "Sweet Sour Sauce (RTU)", "Teriyaki Sauce", "Water Chestnuts", "Parmesan Tomatoes and Button Mushrooms", "Roasted Carrots and Red Onions", "Grated Parmesan Cheese", "Ham Sliced", "Mayonnaise", "Provolone Cheese Sliced", "Sliced Pepper Jack Cheese", "Sliced Roma Tomatoes", "Sugar Snap Peas and Red Peppers (purple)", "Turkey Sliced", "Balsamic Dressing", "Balsamic Garlic Roasted Brussel Sprouts", "Banana Peppers", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Kale", "Cran Raisin", "Cucumber", "Diced Green Peppers", "Edamame", "Garbanzo Beans", "Guacamole", "Hummus", "Potato Hamburger Roll", "Pumpkin Seeds", "Red Beans", "Red Pepper", "Roasted Garlic Sweet Potato", "Shredded Carrots", "Sliced Jalapeno Peppers", "Sliced Mushroom", "Sliced Red Onion", "Sliced Roma Tomatoes", "Sourdough Bread", "Spinach Tortilla 12\"", "Spinach", "Sticky Rice", "Vegan Chipotle Mayonnaise", "Vegan Mayonnaise", "Vegan Shredded Cheddar Cheese", "Vegan Shredded Pepper Jack Cheese", "Vegan Sliced Gouda Cheese", "Vegan Sliced Provolone Cheese", "Whole Grain Bread", "American Cheese Sliced", "BBQ Sauce", "Chipotle Mayonnaise", "Dijon Mustard", "Fresh Bread Butter Pickles", "Fresh Dill Pickles", "Leaf Lettuce", "Mayonnaise", "Pullman Wheat Bread Sliced", "Sliced Red Onion", "Sliced Tomatoes", "Spicy Brown Mustard", "Turkey Sliced", "Cuban Black Bean and Rice", "Chopped Cilantro", "Cotija Cheese", "Guacamole", "Lime Wedges", "Pico de Gallo", "Queso Blanco", "Salsa Roja", "Salsa Verde", "Shredded Jack Cheedar Cheese", "Shredded Lettuce", "Sliced Jalapeno Peppers", "Sour Cream", "Tortilla Chip", "Hummus", "Pickled Onions", "Red pepper Hummus", "Artichoke Hearts", "Balsamic Dressing", "Balsamic Vinegar", "Black Beans", "Blue Cheese Dressing", "Broccoli", "Caesar Dressing", "Chopped Kale", "Chopped Lettuce", "Chopped Romaine", "Chow Mein Noodles", "Corn", "Cran Raisin", "Crouton", "Cucumber", "Diced Green Pepper", "Eggs", "FF Italian", "Fresh Blueberry", "Fresh Strawberry", "Garbanzo Beans", "Garlic Chili Butternut Squash and Red Onions", "Grapes", "Grated Parmesan Cheese", "Mixed Greens", "Olive Oil", "Oyster Crackers", "Peaches in syrup", "Pears in syrup", "Peas", "Pineapple", "Plain Tuna", "Raisins", "Ranch Dressing", "Red Beans", "Red Pepper", "Red Wine Vinegar", "Shredded Carrots", "Shredded Cheddar Cheese", "Shredded Jack Cheedar Cheese", "Sliced Black Olives", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sunflower Seeds", "Thousand Island Dressing", "Tomatoes Diced", "Alfredo Sauce", "Kale Caesar Salad", "Marinara Sauce", "Baby Corn", "Bean Sprouts", "Broccoli", "Brown Rice", "Chopped Basil", "Chopped Cilantro", "Chopped Garlic", "Chopped Ginger", "Chopped Green Onions", "Chow Mein Ramen Noodles", "Diced Green Pepper", "Edamame", "Fried Rice", "General Tso's Sauce", "Green Beans", "Orange Sauce", "Shredded Cabbage", "Sliced Mushroom", "Sliced Red Onion", "Spinach", "Sticky Rice", "Sugar Snap Peas", "Sweet Sour Sauce (RTU)", "Teriyaki Sauce", "Water Chestnuts"]


# This function scrapes the menu on the UMD dining hall website 

def getMenu(num):
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
                        itemTags.append(tag.get("title").lower())
                    item["tags"] = itemTags
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


menus = {}
reviews = {}
menus["north"] = getMenu(51)
menus["yahentamitsi"] = (getMenu(19))
menus["south"] = (getMenu(16))

json_object = json.dumps(menus, indent=4)
 
# Writing to sample.json
with open("menus.json", "w") as outfile:
    outfile.write(json_object)

def generateFavorites(menus, hall):
    favoriteItems = []
    for i in range(1, 10):
        currentMax = {"rating": 0}
        for section in menus[hall]:
            for item in menus[hall][section]:
                if (item["rating"] > currentMax["rating"]) and (item not in favoriteItems):
                    currentMax = item
        
        if currentMax != {"rating": 0}:
            favoriteItems.append(currentMax)
        else:
            break
    
    menus["Favorites"] = favoriteItems
    return menus["Favorites"]

@app.get('/north')
async def root():
    with open('menus.json') as json_file:
        menus = json.load(json_file)
        menus["north"]["Favorites"] = generateFavorites(menus, "north")
    return menus["north"]

@app.get('/yahentamitsi')
async def root():
    with open('menus.json') as json_file:
        menus = json.load(json_file)
        menus["yahentamitsi"]["Favorites"] = generateFavorites(menus, "yahentamitsi")
    return menus["yahentamitsi"]

@app.get('/south')
async def root():
    with open('menus.json') as json_file:
        menus = json.load(json_file)
        menus["south"]["Favorites"] = generateFavorites(menus, "south")
    return menus["south"]