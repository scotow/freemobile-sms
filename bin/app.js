#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const credentialsPath = path.join(__dirname, '..', 'credentials.json');

if(!fs.existsSync(credentialsPath) || (process.argv[2] === '--config')) {
	require('../lib/config.js')()
	.then(sendMessage);
} else {
	sendMessage();
}

function sendMessage() {
	const api = require('../lib/freesmsapi.js');
	const credentials = require('../credentials.json');

	api.send(process.argv.slice(2).join(' '), credentials)
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		if(typeof error === 'number') {
			console.error(`The FreeMobile API return the following HTTP status code: ${error}.`);
			process.exit(error);
		} else {
			console.error(error.message);
			process.exit(1);
		}
	});
}
