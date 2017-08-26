var secrets = require('../secrets.js');

module.exports = {
	'Get the courses!': function (browser) {
		var courses;

		browser
			.url("https://udemy.com")
			.waitForElementVisible(".dropdown.dropdown--login > .dropdown__toggle", 5000)
			.click(".dropdown.dropdown--login > .dropdown__toggle")
			.waitForElementPresent("#id_email", 2000)
			.waitForElementPresent("#id_password", 2000)
			.waitForElementVisible(".loginbox-v4__header", 5000)
			.getText(".loginbox-v4__header", function(result) {
				if (result.value === 'Sign Up and Start Learning!') {
					this.click(".loginbox-v4__footer > a.sign-link");
				}
			})
			.pause(2000)
			.setValue("#id_email", [secrets.username, browser.keys.TAB])
			.setValue("#id_password", [secrets.password, browser.keys.TAB])
			.click("#submit-id-submit")
			.waitForElementPresent(".dropdown.dropdown--mycourses", 5000)
			.pause(1000)
			.execute(function(data) {
				var secrets = arguments[0];
				var req = new XMLHttpRequest();
				var results;
				req.open('GET', "https://www.udemy.com/api-2.0/courses/?page=1&page_size=5&price=price-free&language=en", false);
				req.withCredentials = true;
				req.setRequestHeader('Authorization', secrets.authHeader);
				req.send();
				if (req.status === 200) {
					results = req.responseText;
				}
				return results;
			}, [secrets], function(result) {
				courses = JSON.parse(result.value).results;
				var i = 0;
				var weDone = false;
				while (i < courses.length) {
					this.url("https://udemy.com" + courses[i].url)
						.waitForElementVisible(".buy-box__element.buy-box__element--buy-button > div.clp-component-render > a", 5000, false, function(data) {
							weDone = true;
						});
						if (weDone) {
							i++;
							weDone = false;
							continue;
						}
						this.getText(".buy-box__element.buy-box__element--buy-button > div.clp-component-render > a", function(data) {
							if (data.value === null) {								
								weDone = true;
							}
						});
						if (weDone) {
							i++;
							weDone = false;
							continue;
						}
						this.click(".buy-box__element.buy-box__element--buy-button > div.clp-component-render > a")
						.waitForElementVisible(".success-lead__congrats.success-lead__congrats--cart", 5000, false);
						//TODO: This assert doesn't work, but it'd be really cool if it did.
						//.assert.containsText(".success-lead__congrats.success-lead__congrats--cart", "You've successfully enrolled in")
					i++;
				}				
			});
		browser.end();
		
	}
};