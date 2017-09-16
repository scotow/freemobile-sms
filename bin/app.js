#!/usr/bin/env node

const fs = require('fs');
const credentialsPath = __dirname + '/../credentials.json';
if(fs.existsSync(credentialsPath) || (process.argv[2] === '--config')) {
	require('../lib/config.js')();
} else {
	const api = require('../lib/freesmsapi.js');
	const credentials = require('../credentials.json');

	if(!credentials.user) throw ReferenceError('Invalid user credential.');
	if(!credentials.password) throw ReferenceError('Invalid password credential.');

	const message = process.argv.slice(2).join(' ');
	if(!message) throw SyntaxError('Invalid message.');

	api.send(message, credentials)
	.catch(statusCode => {
		process.exit(statusCode);
	});
}
