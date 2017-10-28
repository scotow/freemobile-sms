const request = require('request');

function send(messages, credentials) {
	if(typeof messages === 'string' && messages) messages = [messages];
	messages = messages.filter(Boolean);
	if(!messages.length) return Promise.reject(new ReferenceError('Invalid message.'));
	if(!credentials.user) return Promise.reject(new ReferenceError('Invalid user credential.'));
	if(!credentials.password) return Promise.reject(new ReferenceError('Invalid password credential.'));

	return messages.map((message) => message.match(/[\s\S]{1,999}/g).map(chunck => {
		return new Promise((resolve, reject) => {
			request({
				method: 'POST',
				url: 'https://smsapi.free-mobile.fr/sendmsg',
				json: true,
				body: {
					user: credentials.user,
					pass: credentials.password,
					msg: chunck
				}
			}, (error, res, body) => {
				switch(res.statusCode) {
					case 200:
						resolve(res.statusCode);
						break;
					default:
						reject(res.statusCode);
				}
			});
		});
	}))
	.reduce((prev, cur) => prev.concat(cur))
	.reduce((prev, cur) => prev.then(cur));
}

module.exports.send = send;
