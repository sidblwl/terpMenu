from bs4 import BeautifulSoup
import requests
from datetime import datetime
date = datetime.now()
day = str(date.strftime("%m/%d/%Y"))
page = requests.get("https://nutrition.umd.edu/?locationNum=19&dtdate=", day)
parser = BeautifulSoup(page.text, "html.parser")
items = (parser.find_all("a", class_="menu-item-name"))

for item in items:
    print(item.text)