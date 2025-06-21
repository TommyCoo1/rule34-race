import time
import requests
import json
from bs4 import BeautifulSoup

def scrape_tags(pids):
    session = requests.Session()
    session.headers.update({
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/114.0.0.0 Safari/537.36"
        ),
        "Referer": "https://rule34.xxx/",
    })

    data, names = [], []
    for pid in pids:
        url = (
            "https://rule34.xxx/index.php"
            "?page=tags&s=list&tags=&order_by=index_count&sort=desc&pid={}"
        ).format(pid)

        # Cookies
        session.get("https://rule34.xxx/")

        # Retry-Loop
        for attempt in range(3):
            resp = session.get(url)
            if resp.status_code == 200:
                break
            time.sleep(2 ** attempt)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")
        table = soup.find("table", class_="highlightable")
        if table is None:
            raise ValueError(f"PID {pid}: Tabelle nicht gefunden!")

        # print("Table:", table)
        # for row in table.select("tbody > tr:not(.tableheader)"):
        for row in table.select("tr:not(.tableheader)"):
            # print("Row:", row)
            # print("Cells:", cells)
            cells = row.find_all("td")
            posts = int(cells[0].text.strip())
            name  = cells[1].find("a").text.strip()
            type_ = cells[2].text.strip()
            data.append({"posts": posts, "name": name, "type": type_})
            names.append(name)

        time.sleep(1)

    return data, names


if __name__ == "__main__":
    # pages, 500 tags
    pids = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500]
    # pids = [0]
    data, names = scrape_tags(pids)
    
    with open("tags_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    with open("tags_names.json", "w", encoding="utf-8") as f:
        json.dump(names, f, ensure_ascii=False, indent=2)

    print("it fkcing worked: tags_data.json, tags_names.json")
