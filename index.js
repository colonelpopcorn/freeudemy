const ax = require('axios');
const Nightmare = require('Nightmare');
const fs = require('fs');
const path = require('path');
const url = 'https://www.udemy.com/api-2.0/courses/';

// Query parameters, change these to get more courses or different language courses.
const pageSize = 2500;
const languageCode = 'en';

// Make sure secrets file exists.
if (fs.existsSync(path.resolve(__dirname, 'secrets.js'))) {

	const finalUrl = url + '?page=1&page_size=' + pageSize + '&price=price-free&language=' + languageCode;

	// Get secrets from secrets file.
	const secrets = require(path.resolve(__dirname, 'secrets.js'));
	console.log("Secrets file found!");

	ax.get(finalUrl, {
		headers: { 'Authorization': secrets.authHeader }
	})
	.then(function (res) {
		var results = JSON.stringify(res.data.results, null, "\t");
		fs.writeFile(path.resolve(__dirname, 'courses.json'), results, function (err) {
			if (err) { console.log('Cannot write courses file!'); throw err; }
			console.log('Courses json file saved!');
		})

	})
	.catch(function (err) {
		if (err) { console.log('Cannot get course data!'); throw err; }
	});

}
else {
	// Warn user if secrets file doesn't exist.
	console.log("Secrets file not found! Please rename secrets.example.js and fill in your information from Udemy.com!");
}
