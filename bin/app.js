#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const credentialsPath = path.join(__dirname, '..', 'credentials.json');

if(!fs.existsSync(credentialsPath) || (process.argv[2] === '--config')) {
	require('../lib/config.js')()
	.then(() => sendMessage());
} else {
	sendMessage();
}

function sendMessage() {
	const api = require('../lib/freesmsapi.js');
	const credentials = require('../credentials.json');

	const argv = require('yargs')
		.option('f', {
			alias: 'file',
			describe: 'File(s) to be add to the SMS',
			default: [],
			type: 'array',
			nargs: 1
		})
		.option('encoding', {
			describe: 'File(s) encoding',
			default: 'utf8',
			type: 'string',
			nargs: 1
		})
		.option('s', {
			alias: 'split',
			describe: 'Split each string arguments in separate messages',
			default: false,
			type: 'boolean'
		})
		.epilogue('For more information, find more information at https://github.com/Scotow/freemobile-sms.')
		.argv
	;

	const messages = argv.split ? argv._ : [argv._.join(' ')];
	argv.file.forEach((file) => {
		try {
			messages.push(fs.readFileSync(file, argv.encoding));
		} catch(error) {
			console.error(`${file}: No such file.`);
			process.exit(1);
		}
	});

	api.send(messages, credentials)
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
