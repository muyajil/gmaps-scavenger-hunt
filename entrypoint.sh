#!/bin/sh

sed -i 's/<MAPS_API_KEY>/'"$MAPS_API_KEY"'/g' /usr/share/nginx/html/static/js/*.js
sed -i 's/<SUCCESS_REDIRECT_URL>/'"$SUCCESS_REDIRECT_URL"'/g' /usr/share/nginx/html/static/js/*.js

exec nginx -g "daemon off;"