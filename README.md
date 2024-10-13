# sba308a

https://github.com/timotholt/sba308a

Uses all these external APIs:

Geolocation services:
    GET:
        http://ip-api.com/json/                     -- Used to populate form box with the current zip code (GET)

Zipcode math:
    GET:
        https://zip-api.eu/api/v1/radius/           -- Get list of zipcodes within range (unlimited up to 147 miles) 
        https://app.zipcodebase.com/api/v1/radius   -- Get list of zipcodes (very limited use, use sparingly)

