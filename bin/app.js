#!/usr/bin/env node

// Modules.
const path = require('path');
const fs = require('fs-extra');
const yargs = require('yargs');

const api = require('../lib/freesmsapi.js');
const apiConfiguration = require('../lib/config.js');

// Config.
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');

// Load credentials or prompt user for it if needed.
async function loadCredentials() {
	if(!await fs.pathExists(CREDENTIALS_PATH)) {
		await apiConfiguration();
	}

	const credentials = await fs.readJson(CREDENTIALS_PATH);
	if(!credentials.user || !credentials.password) {
		return loadCredentials();
	}

	return credentials;
}

// Parse command line arguments. Type --help for help.
function parseArguments() {
	return yargs
		.option('s', {
			alias: 'split',
			describe: 'Split each string arguments in separate messages',
			default: false,
			type: 'boolean'
		})
		.option('f', {
			alias: 'file',
			describe: 'File(s) to be add to the SMS',
			default: [],
			type: 'array',
			nargs: 1
		})
		.option('e', {
			alias: 'encoding',
			describe: 'File(s) encoding',
			default: 'utf8',
			type: 'string',
			nargs: 1
		})
		.option('c', {
			alias: 'config',
			describe: 'Prompt for credentials',
			default: false,
			type: 'boolean'
		})
		.epilogue('For more information, please visit https://github.com/Scotow/freemobile-sms.')
		.argv;
}

// Read files from '-f' option.
async function loadFiles(files, encoding) {
	return Promise.all(files.map(file => fs.readFile(file, { encoding })));
}

// Main method.
async function sendMessages() {
	// Parse commnad line arguments.
	const argv = parseArguments();

	// Configure credentials if asked.
	if(argv.config) {
		await apiConfiguration();
		// Stop here if the user just wanted to configure his credentials.
		if(argv._.length + argv.file.length === 0) return;
	}

	// Fetch credentials.
	const credentials = await loadCredentials();

	// Join message if asked.
	let messages = argv.split ? argv._ : [argv._.join(' ')];
	messages = messages.concat(await loadFiles(argv.file, argv.encoding));

	// Send the messages.
	return api.send(messages, credentials);
}

sendMessages()
.catch(error => {
	console.error(error.message);
	process.exit(1);
});