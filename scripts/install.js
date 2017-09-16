const readline = require('readline');
const fs = require('fs');
let credentials = {};

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
			fs.writeFileSync(__dirname + '/../credentials.json', JSON.stringify(credentials));
		} else {
			getSecretKey();
		}
	});
}

getUserId();
