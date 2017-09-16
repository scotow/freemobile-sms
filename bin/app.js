#!/usr/bin/env node

const api = require('../lib/freesmsapi.js');

credentials = require('../credentials.json');
if(!credentials.user) throw ReferenceError('Invalid user credential.');
if(!credentials.password) throw ReferenceError('Invalid password credential.');

const message = process.argv.slice(2).join(' ');
if(!message) throw SyntaxError('Invalid message.');

api.send(message, credentials)
.catch(statusCode => {
	process.exit(statusCode);
});
