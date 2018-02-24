# T_T coding=utf-8 T_T

"""
Generating sitemap.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "SitemapGenerator"


from datetime import datetime
import os

config = {
    "site_root": "hana-ui.moe",
    "sitemap_priority": 0.5,
    "sitemap_freq": "daily",
    "in_dir": "demo/src/pages",
    "sitemap_name": "sitemap"
}

langs = ['en', 'cn']

template = {
    "begin": """<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

""",
    "content": """<url>
<loc>{0}</loc>
<lastmod>{1}</lastmod>
<changefreq>{2}</changefreq>
<priority>{3}</priority>
</url>

""",
    "end": "</urlset>"
}

def format_date(date, mode):
    if date.tzinfo:
        tz = date.strftime('%z')
        tz = tz[:-2] + ':' + tz[-2:]
    else:
        tz = "-00:00"
    if mode == "sitemap":
        return date.strftime("%Y-%m-%dT%H:%M:%S") + tz
    elif mode == "feeds":
        return date.strftime("%A, %d %b %Y %H:%M:%S ") + tz

def add_one(url, time):
    result = template["content"].format(
        url,
        format_date(time, "sitemap"),
        config["sitemap_freq"],
        config["sitemap_priority"]
    )
    return result

def generate():
    urls = {
        "http": ["http://" + config["site_root"]],
        "https": ["https://" + config["site_root"]]
    }
    for root, dirs, files in os.walk(config["in_dir"]):
      for d in dirs:
        tmp = ''
        for c in d:
            tmp += c if c.islower() else '-' + c.lower()
        d = tmp[1:]
        for lang in langs:
            url = root.replace('demo/src/pages', config["site_root"] + '/' + lang) + "/" + d.lower()
            urls["http"].append("http://" + url)
            urls["https"].append("https://" + url)

    for postfix in ['http', 'https']:
        with open("demo/" + config["sitemap_name"] + "-" + postfix + ".xml", "w") as f:
            f.write(template["begin"])
            for url in urls[postfix]:
                f.write(add_one(url, datetime.now()))
            f.write(template["end"])

generate()
