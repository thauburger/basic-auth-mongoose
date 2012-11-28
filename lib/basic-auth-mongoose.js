/* user-basic-auth-mongoose */

var crypto = require('crypto');

module.exports = exports = function (schema, options) {
  
  options = options || {};
  options.encryptionMethod = options.encryptionMethod || 'sha256';

  schema.add({ 
    username  : { type : String, required : true, index : { unique : true }},
    pass_hash : { type : String, required : true },
    salt      : { type : String, required : true }
  });

  schema.virtual('password').set(function (password) {
    this.salt = this.createSalt();
    this.pass_hash = this.encryptPassword(password);
   });

  schema.virtual('password').get(function () {
    return this.pass_hash;
  });

  schema.methods.createSalt = function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  };

  schema.methods.encryptPassword = function (plaintext) {
    return crypto.createHmac(options.encryptionMethod, this.salt).update(plaintext).digest('hex');
  };

  schema.methods.authenticate = function (plaintext) {
    return this.encryptPassword(plaintext) === this.password;
  };

  schema.virtual('id').get(function () {
    return this._id.toHexString();
  });

};