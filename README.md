

# https://classicarmory.org



# Running
* npm install
* npm run dev
* Open localhost:5000 in your browser

* Since the backend part of this website is closed, for testing purposes query directly from production.

Change this line of code in src/globals.js

`const BACKEND_URL = development ? 'http://localhost:8090' : 'https://armory-backend.whydoisuckatvideogames.com';`

to:

`const BACKEND_URL = 'https://armory-backend.whydoisuckatvideogames.com';`

# Building
* npm run build

