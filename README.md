#basic-auth-mongoose

basic-auth is a [Mongoose](http://mongoosejs.com/) [plugin](http://mongoosejs.com/docs/plugins.html) that provides traditional password-based user authentication. It can be used to supplement any Mongoose [schema](http://mongoosejs.com/docs/guide.html) where authentication is required.

##Installation

basic-auth is available via NPM. To install:

	$ npm install basic-auth-mongoose

##Usage

###Mongoose Plugin

basic-auth allows you to plugin password-based authentication for any Mongoose schema. Let's say you're working on a site, and already have your basic `User` schema going:

````
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email : String,
	first : String,
	last  : String,
});

````

To build in authentication, all you need to do is plugin basic-auth, and create a new model:

````

userSchema.plugin(require('basic-auth'));

var User = mongoose.model('User', userSchema);

````

####Authentication Properties

Plugging in basic-auth will add two required properties on your User schema: `username` and `password`. Just fill in that info when you're creating your user:

````
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
		console.log('User saved!!');
	}
});

````
The user's password will be automatically encrypted when the user is created and saved.

####Methods


####Sugar

###Options

###Examples

###Contributions

Inspired by saintedlama's passport-local-mongoose module.

Also, thanks to alexyoung for his Nodepad tutorial on Daily JS.
This module reuses some of the password encryption techniques found there.

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