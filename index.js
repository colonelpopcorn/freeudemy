
const ApiModule = require('./ApiModule');
const NightmareModule = require('./NightmareModule');
const program = require('commander');

program
	.version('1.0.0')
	.option('-j, --save-json', 'Save course data from Udemy API to a json file for later processing.')
	.option('-l, --local', 'Use json saved with the save-json option to get courses instead of the Udemy API.')
	.option('-p, --prompt', 'Prompt before enrolling in each course.')
	.parse(process.argv);

try {
	var courses = ApiModule.getCourses();
	NightmareModule.enroll(courses);

} catch (e) {
	console.log('Something went wrong!');
	console.log(e);
}
