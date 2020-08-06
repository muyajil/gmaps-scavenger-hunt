# Google Maps Scavenger Hunt

## Description

This is a small React application that allows you to create your own Scavenger Hunt using Google Maps.

You can customize this application to your use case very easily.

This was implemented for use on a smartphone, it will not look good on your desktop.

## Customization

The folder `public/data` contains examples of files you need to provide.

- `avatar.png`: This image will be displayed as the marker of the user on the map.
- `banner.png`: This image will be used on the welcome screen when the backstory is displayed.
- `challenges.json`: This file contains the challenges and the passwords for the Scavenger Hunt. See the file for an example.
- `backgroundParagraphs.json`: This file contains the backstory of the application.

## Setup and Run

1. Create a folder `data` that contains the files mentioned above with your content.
2. Create a `.env` file according to `.env_template`
    - `MAPS_API_KEY`: Create a Google Maps API Key (https://developers.google.com/maps/documentation/javascript/get-api-key) 
    - `SUCCESS_REDIRECT_URL`: Redirect to this URL after the last challenge was solved.
3. Use the following docker-compose configuration:

```
version: '3.5'

services:
  hunt:
    image: muyajil/gmaps-scavenger-hunt:latest
    environment:
        MAPS_API_KEY: ${MAPS_API_KEY}
        SUCCESS_REDIRECT_URL: ${SUCCESS_REDIRECT_URL}
    volumes:
        - /path/to/data/:/usr/share/nginx/html/data/
    ports:
      - 3001:80
```

4. Host this somewhere and play!
