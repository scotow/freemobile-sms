// Modules.
const request = require('request-promise-native').defaults({
	method: 'POST',
	url: 'https://smsapi.free-mobile.fr/sendmsg',
    json: true
});

// Config.
const MAX_MESSAGE_LENGTH = 999;

// Send a single message.
async function single(message, credentials) {
	if(!message.length) throw new Error('Invalid message.');

	return request({
		body: {
			user: credentials.user,
			pass: credentials.password,
			msg: message
		}
	});
}

// Send the messages one by one (order is not garanteed).
async function multiple(messages, credentials) {
	for(let message of messages) {
		await single(message, credentials);
	}
}

// Filter and send messages.
async function send(messages, credentials) {
	// Check credentials.
	if(!credentials.user) throw new Error('Invalid user credential.');
	if(!credentials.password) throw new Error('Invalid password credential.');

	// Make sure the messages is an array.
	if(typeof messages === 'string') messages = [messages];

	// Remove empty messages.
	messages = messages.filter(Boolean);

	// Stop if no valid message.
	if(!messages.length) throw new Error('Invalid message(s).');

	// Cast and split large message if needed.
	const splitRegex = new RegExp(`[\\s\\S]{1,${MAX_MESSAGE_LENGTH}}`, 'g');
	messages = messages
					.map(message => typeof message === 'message' ? message : String(message))
					.map(message => message.match(splitRegex))
					.reduce((prev, cur) => prev.concat(cur));

	return multiple(messages, credentials);
}

module.exports.send = send;
