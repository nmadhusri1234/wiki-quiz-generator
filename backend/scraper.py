import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url):
    headers = {
        "User-Agent":"Mozilla/5.0"
    }
    response = requests.get(url,headers=headers)
    print(response.status_code)
    soup = BeautifulSoup(response.text,"html.parser")
    title_tag = soup.find("h1")

    if title_tag:
        title = title_tag.text
    else:
        title = "No Title Found"

    paragraphs = soup.find_all("p")
    content = ""

    for para in paragraphs:
        content+=para.text

    return{
        "title":title,
         "content":content

    }