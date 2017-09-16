# freemobile-sms

A simple API and command line tools to send SMS using Free Mobile.

### How to install

`npm install -g https://github.com/Scotow/freemobile-sms`

### Example

`sms Hello World!`
> Send a SMS to your mobile phone with the 'Hello World!' text.

### Credentials

Setup your credentials using one of the following methods:

- Run `sms --config`

- editing the `credentials.json` file in the project's directory and fill it using the following pattern:

```JSON
{
	"user": "YOUR_USER_ID",
	"password": "YOUR_SECRET_KEY"
}
```

### App

Head to this [link](https://mobile.free.fr/moncompte/index.php?page=options) to get your secret key. 🔑
