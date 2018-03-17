const readline = require('readline');
const path = require('path');
const fs = require('fs-extra');

module.exports = function() {
	return new Promise((resolve, reject) => {
		const credentials = {};
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		function getUserId() {
			rl.question('User ID: ', user => {
				if(!user) {
					return getUserId();
				}

				credentials.user = user;
				getSecretKey();
			});
		}

		function getSecretKey() {
			rl.question('Secret Key: ', key => {
				if(!key) {
					return getSecretKey();
				}

				credentials.password = key;
				rl.close();
				fs.writeJSON(path.join(__dirname, '..', 'credentials.json'), credentials, error => {
					if(error) return reject(error);
					resolve();
				});
			});
		}

		getUserId();
	});
};
