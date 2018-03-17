# freemobile-sms

💬 **A simple [free-mobile](http://mobile.free.fr)'s sms API wrapper** 💬

A simple API and command line tools to send SMS using the Free Mobile 'notification' option.

### Prerequisites

This module was developed using [Node.js](http://nodejs.org) 8.9.X and was not tested with previous versions (even if it may work with previous releases).

### How to install

#### As a project module

`npm install -S freemobile-sms`

#### As a global package

`npm install -g freemobile-sms`

### Example

#### Using the library

*freemobile-sms* use [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to make call to the API. Here is an example that send a SMS and display and error if something went wrong:

###### .send(message, credentials)
###### .send([message], credentials)

```js
const freemobile = require('freemobile-sms');

freemobile.send('Hello, World!', credentials)
.then(() => {
	// Message(s) sent.
})
.catch(error => {
	console.error('An error has occurred while sending the message.');
	// An error has occurred, an Error is return if the credentials wasn't setup or if the message is incorrect.
	// NB: Be careful to don't overuse the api because it has a daily limit (maybe 300 messages per day).
});
```

#### Using the built-in command

`sms Hello World!`
> Send a SMS to your mobile phone with the 'Hello World!' text.

`sms -s Hello World!`
> Handle each argument as a single message (send two message 'Hello' and 'World!').

`sms -f my_file.txt`
> Send the content of the 'my_file.txt' file.

`sms -f my_file.txt -e ascii`
> Same as previous, but use ascii [encoding](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) to read the file.

`sms -c Hello World!`
> (Re)configure your credentials before sending the 'Hello World!' message.

### Credentials

Setup your credentials using one of the following methods:

- Run `sms -c` or `sms --config`

- Create a `credentials.json` file in the project's directory and fill it using the following pattern:

```JSON
{
	"user": "YOUR_USER_ID",
	"password": "YOUR_SECRET_KEY"
}
```

*NB: If no credentials are set when running the `sms` command, the credentials configuration process will be called automatically.*

### App

Head to this [link](https://mobile.free.fr/moncompte/index.php?page=options) to get your secret key. 🔑

### Disclaimer

*freemobile-sms* provided by *Scotow* is for illustrative purposes only which provides customers with programming information regarding the products. This software is supplied "AS IS" without any warranties and support.

I assumes no responsibility or liability for the use of the software, conveys no license or title under any patent, copyright, or mask work right to the product.
