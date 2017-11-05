const request = require('request');

function send(messages, credentials) {
	if(typeof messages === 'string' && messages) messages = [messages];
	messages = messages.filter(Boolean);
	if(!messages.length) return Promise.reject(new ReferenceError('Invalid message.'));
	if(!credentials.user) return Promise.reject(new ReferenceError('Invalid user credential.'));
	if(!credentials.password) return Promise.reject(new ReferenceError('Invalid password credential.'));

	function chunkPromise(chunk) {
		return new Promise((resolve, reject) => {
			request({
				method: 'POST',
				url: 'https://smsapi.free-mobile.fr/sendmsg',
				json: true,
				body: {
					user: credentials.user,
					pass: credentials.password,
					msg: chunk
				}
			}, (error, res, body) => {
				switch(res.statusCode) {
					case 200:
						resolve(res.statusCode);
						break;
					default:
						reject(res.statusCode);
						break;
				}
			});
		});
	}

	const chunks = messages.map((message) => message.match(/[\s\S]{1,999}/g)).reduce((prev, cur) => prev.concat(cur));
	if(chunks.length === 1) {
		return chunkPromise(chunks[0]);
	} else {
		return chunks.map(chunk => chunkPromise.bind(null, chunk))
		.reduce((prev, cur) => prev.then(cur), Promise.resolve());
	}
}

module.exports.send = send;
