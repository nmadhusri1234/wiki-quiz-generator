from scraper import scrape_wikipedia

url = "https://en.wikipedia.org/wiki/Alan_Turing"

data = scrape_wikipedia(url)

print(data["title"])
print(data["content"][:1000])
