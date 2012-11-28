#basic-auth-mongoose

Basic-auth is a [Mongoose](http://mongoosejs.com/) [plugin](http://mongoosejs.com/docs/plugins.html) that provides password-based user authentication for your Mongoose [schema](http://mongoosejs.com/docs/guide.html).

Basic-auth provides:

- Required `username` and `password` properties
- A simple `authenticate` method to use when signing users into your service
- Automatic password encryption
- Framework agnostic authentication and storage. Use it with Express, Passport, or on it's own.


##Installation

	$ npm install basic-auth-mongoose

Tested with Mongoose > 3.4.x.

##Usage

###Mongoose Plugin

Basic-auth allows you to add password-based authentication to any Mongoose schema. Let's say you're working on a site where your basic `User` schema is shaping up like so:

````javascript
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email : String,
	first : String,
	last  : String,
});
````

To add authentication functionality, all you need to do is plugin basic-auth, and create your new `User` model:

````javascript
userSchema.plugin(require('basic-auth-mongoose'));
var User = mongoose.model('User', userSchema);
````

####Authentication Properties

Plugging in basic-auth will add two required properties on top of your original `User` schema: `username` and `password`. Just fill in those credentials when you're creating a user, and the user's password will be automatically encrypted for secure storage.

````javascript
var tom = new User({
	email : 'tom@test.com',
	first : 'Tom',
	last  : 'Smith',
	username : 'toms1234',
	password : 'secret'
});

tom.save(function (err, user) {
	if (err) // handle
	else {
		console.log('User is saved and password is encrypted!!');
	}
});
````

####Methods

In addition to the `username` and `password` properties, you'll also get a handy `user.authenticate(password)` method. This method accepts a plain text password, and will return `true` if the password is correct, and `false` otherwise.

````javascript
User.findOne({'username' : 'toms1234'}, function (err, tom) {
	if (err) // handle
	else {
		tom.authenticate('wrong-password'); // returns false
		tom.authenticate('secret'); // returns true
	}
});
````

####Sugar

Using basic-auth will also give you an `id` property, which will return the auto-generated MongoDB `_id`. To use, simply call:

````javascript
tom.id  // returns MongoDB _id (e.g. 5A0009284I2)
````

###Options

You can configure the hashing algorithm used to encrypt the user's password. By default, basic-auth uses `'sha256'
`. To change the encryption method, simply pass in the `encryptionMethod` option when applying basic-auth:

````javascript
var options = { 'encryptionMethod' : 'sha1' };
userSchema.plugin(require('basic-auth', options));
````

You are free to choose any of the hashing algorithms made available by Node's [crypto](http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm) library. 
Examples are `sha1`, `sha256`,`sha512`,`md5`.

###Examples

A full example of using basic-auth for a simple login / registration system is coming soon.

###Contributions

Inspired by [saintedlama](https://github.com/saintedlama/passport-local-mongoose)'s passport-local-mongoose module.

Also, thanks to [alexyoung](https://github.com/alexyoung) for his [Nodepad tutorial](http://dailyjs.com/2010/12/06/node-tutorial-5/) on Daily JS. This module reuses some of the password encryption techniques found there.

###License (GPL)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see http://www.gnu.org/licenses/.