### How to use this script

- Get a udemy API key.
- Go to the Udemy API console to get a base64 request header. (Could be a way to do this dynamically, but I'm not familiar with Udemy's specific encoding)
- Create secrets.js file with apikey and secret like so


```
module.exports = {
	authHeader: "/* You can get this from Udemy's API console. */",
	username: '/* Your udemy username */',
	password: '/* Your udemy password */'
}
```


- Run NPM or Yarn install.
- Open up a terminal and type `npm run main` or `nightwatch` if you have nightwatch installed globally.
- Let the script run.

### Options

## Request Size

You can change the request size by editing the URL on line 30 in `tests/nightwatch.js`. Please see the Udemy API docs for options.


