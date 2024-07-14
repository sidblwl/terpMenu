import json

def update_menu_with_reviews(menus_file, reviews_file, output_file, hall):
    # Load the JSON files
    print("menus now")
    with open(menus_file, 'r') as mf:
        menus = json.load(mf)

    with open(reviews_file, 'r') as rf:
        reviews = json.load(rf)

# Traverse through the menu items and update the reviews
    for diningHall, sections in menus.items():
        if(diningHall == hall):
            for section, items in sections.items():
                for item in items:
                    item_name = item['name']
                    # Find the corresponding item in reviews and update the reviews array
                    for hall_reviews, sections_reviews in reviews.items():
                        if(diningHall == hall_reviews):
                            for section_reviews, items_reviews in sections_reviews.items():
                                for review_item in items_reviews:
                                    if review_item['name'] == item_name:
                                        item['reviews'] = review_item['reviews']
                                        item['rating'] = review_item['rating']
                                        break

# Save the updated menus to a new file
    with open(output_file, 'w') as of:
        json.dump(menus, of, indent=4)