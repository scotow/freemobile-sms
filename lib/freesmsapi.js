const request = require('request');

function send(message, credentials) {
	if(!credentials.user) return Promise.reject(new ReferenceError('Invalid user credential.'));
	if(!credentials.password) return Promise.reject(new ReferenceError('Invalid password credential.'));
	if(!message) return Promise.reject(new ReferenceError('Invalid message.'));

	return message.match(/.{1,999}/g).map(chunck => {
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
	})
	.reduce((prev, cur) => prev.then(cur));
}

module.exports.send = send;
