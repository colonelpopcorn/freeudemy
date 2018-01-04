
const ApiModule = require(path.resolve(__dirname, 'ApiModule'));

try {
	var courses = ApiModule.getCourse();
	NightmareModule.enroll(courses);

} catch (e) {
	console.log('Something went wrong!');
}