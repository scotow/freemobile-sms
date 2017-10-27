const readline = require('readline');
const path = require('path');
const fs = require('fs');

module.exports = function() {
	return new Promise((resolve, reject) => {
		const credentials = {};
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		function getUserId() {
			rl.question('User ID: ', (user) => {
				if(user) {
					credentials.user = user;
					getSecretKey();
				} else {
					getUserId();
				}
			});
		}

		function getSecretKey() {
			rl.question('Secret Key: ', (key) => {
				if(key) {
					credentials.password = key;
					rl.close();
					fs.writeFileSync(path.join(__dirname, '..', 'credentials.json'), JSON.stringify(credentials));
					resolve();
				} else {
					getSecretKey();
				}
			});
		}

		getUserId();
	});
};
