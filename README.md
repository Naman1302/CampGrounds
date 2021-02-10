# CampGrounds
YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

<h3>Features</h3>
<ul>
<li>Users can create, edit, and remove campgrounds</li>
<li>Users can review campgrounds once, and edit or remove their review</li>
<li>User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account</li>
<li>Search campground by name or location</li>
<li>Sort campgrounds by highest rating, most reviewed, lowest price, or highest price</li>
</ul>
<h3>Run it locally</h3>
Install mongodb
Create a cloudinary account to get an API key and secret code
git clone https://github.com/Naman1302/CampGrounds.git
cd yelpcamp
npm install
Create a .env file (or just export manually in the terminal) in the root of the project and add the following:

DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
Run mongod in another terminal and node app.js in the terminal with the project.

Then go to localhost:3000.

To get google maps working check this out.
