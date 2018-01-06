const fs = require('fs');
const path = require('path');
const ax = require('axios');
const secrets = require('./secrets.js');

var ApiModule = module.exports = {
	_count: 0,
	_courses: [],
	_path: 'courses.json',
	_pageNumber: 0,
	_pageSize: 100, // Max page size is 100.
	_languageCode: 'en',
	_secrets: require(path.resolve(__dirname, 'secrets.js')),
	_url: 'https://www.udemy.com/api-2.0/courses/',
	getCourses: function() {
		let finalUrl = `${this._url}?page=${this._pageNumber+1}&page_size=${this._pageSize}&price=price-free&language=${this._languageCode}`;
		

		return ax.get(finalUrl, {
			headers: { 'Authorization': secrets.authHeader }
		})
		.then(function (res) {
			if (this._count === 0) {
				this._count = res.data.count;
				this._courses = this._courses.concat(res.data.results);
			}
			else {
				this._count = this._count - this._pageSize;
				this._courses = this._courses.concat(res.data.results);
			}
			if (this._count > 0) {
				return this.getCourses();
			}
			else {
				return this._courses;
			}
		}.bind(this))
		.catch(function (err) {
			if (err) { console.log('Cannot get course data!'); throw err; }
		});
	}	
}