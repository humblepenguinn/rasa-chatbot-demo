# Json cleanup and image downloader (jcid.py)
# This is just a utility script that will clean up the JSON and download the images. It is not a part of the API
import json

def get_image_urls(json_data):
    image_urls_with_count = {}
    for count, data in enumerate(json_data):
        img_url = data["p"]["properties"]["img"]
        if img_url in image_urls_with_count.values():
            continue
        image_urls_with_count[count] = img_url
    return image_urls_with_count



with open("data_json.json", "r") as file:
    data = json.load(file)
    img_urls = get_image_urls(data)


with open("images.json", "w") as file:
    json.dump(img_urls, file, indent=4)



