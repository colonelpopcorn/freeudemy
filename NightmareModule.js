const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const secrets = require('./secrets');
//const expect = require('chai').expect;

var NightmareModule = module.exports = {
	_index: 0,
	enroll: function(courses) {
		courses.then(function(result) {
			this.automationFunction(result);
		}.bind(this))
		.catch(function(err) {
			if (err) { console.log('Cannot enroll in courses!'); throw err; }
		})
	},
	automationFunction: function(result) {
		if (this._index > result.length) {
			return true;
		}
		else {
			course = result[this._index];
			return nightmare
				.goto('https://udemy.com')
				.wait('.dropdown--login')
				.click('.btn-quaternary')
				.wait('#id_email')
				.type('#id_email', secrets.username)
				.type('#id_password', secrets.password)
				.click('#submit-id-submit')
				.wait('.dropdown--mycourses')
				.goto(`https://udemy.com${course.url}`)
				.wait('.course-cta--buy')
				.click('.course-cta--buy')
				.evaluate(() => {
					return document.querySelector('.container').innerText;
				})
				.cookies.clearAll()
				.end()
				.then(function(result) {
					if(result.includes('Congratulations! You\'ve successfully enrolled in')) {
						console.log(`Successfully enrolled in ${course.title}`);
						console.log('Enrolling in next course now...');
						this._index++;
						return this.automationFunction(result);
					}
					else { throw new Error(); }
				}.bind(this))
				.catch(function(err) {
					if (err) { console.log(`Couldn't enroll in ${course.title}!`);}
				});
		}
	}
}