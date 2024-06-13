import json

def update_menu_with_reviews(menus_file, reviews_file, output_file):
    # Load the JSON files
    with open(menus_file, 'r') as mf:
        menus = json.load(mf)
    
    with open(reviews_file, 'r') as rf:
        reviews = json.load(rf)
    
    # Traverse through the menu items and update the reviews
    for hall, sections in menus.items():
        for section, items in sections.items():
            for item in items:
                item_name = item['name']
                # Find the corresponding item in reviews and update the reviews array
                for hall_reviews, sections_reviews in reviews.items():
                    for section_reviews, items_reviews in sections_reviews.items():
                        for review_item in items_reviews:
                            if review_item['name'] == item_name:
                                item['reviews'] = review_item['reviews']
                                break
    
    # Save the updated menus to a new file
    with open(output_file, 'w') as of:
        json.dump(menus, of, indent=4)

# Example usage: