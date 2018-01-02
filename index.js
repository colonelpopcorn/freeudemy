
const Nightmare = require('Nightmare');
const fs = require('fs');
const path = require('path');
const ApiModule = require(path.resolve(__dirname, 'ApiModule'));


// Make sure secrets file exists.
if (fs.existsSync(path.resolve(__dirname, 'secrets.js'))) {

	// Get courses from Udemy Api.
	ApiModule.getCourses();

}
else {
	// Warn user if secrets file doesn't exist.
	console.log("Secrets file not found! Please rename secrets.example.js and fill in your information from Udemy.com!");
}

function nightmareMode(obj) {
	console.log(JSON.stringify(obj));
}