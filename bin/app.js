#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const credentialsPath = path.join(__dirname, '..', 'credentials.json');

const argv = require('yargs')
	.option('f', {
		alias: 'file',
		describe: 'File(s) to be add to the SMS',
		type: 'string',
		nargs: 1,
		coerce: (arg) => {
			if(!fs.existsSync(arg) {
				
			});
		}
	})
	.epilogue('For more information, find more information at https://github.com/Scotow/freemobile-sms.');
	.argv
;

console.dir(argv);
process.exit(0);

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
