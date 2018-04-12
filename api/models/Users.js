/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

    schema: false,
    connection: 'blondie',

    attributes: {

          firstname: {
        type: 'string'
      },

      lastname: {
        type: 'string'
      },

      email: {
        type: 'string'
      },

      username: {
        type: 'string',
        required: 'true',
        unique: true
      },

      encryptedPassword: {
        type: 'string'
      },

      status: {
        type: 'integer',
        defaultsTo: 0,
      },

      isAdmin: {
        type: 'boolean',
        defaultsTo: false
      },

      isManager: {
        type: 'boolean',
        defaultsTo: false
      },

      // We don't wan't to send back encrypted password either
      toJSON: function () {
        var obj = this.toObject();
        delete obj.encryptedPassword;
        return obj;
      }
    },

    // Here we encrypt password before creating a User
    beforeCreate : function (values, next) {
      bcrypt.genSalt(10, function (err, salt) {

        if(err) return next(err);

        bcrypt.hash(values.password, salt, function (err, hash) {


          if(err) return next(err);
          values.encryptedPassword = hash;
          next();
        })
      })
    },

    // Here we encrypt password before creating a User
    beforeUpdate : function (values, next) {
      if(values.password){
        bcrypt.genSalt(10, function (err, salt) {

          if(err) return next(err);

          bcrypt.hash(values.password, salt, function (err, hash) {
            if(err) return next(err);
            values.encryptedPassword = hash;
            next();
          })
        })
      } else {
        next();
      }
    },

    comparePassword : function (password, user, cb) {
        
      bcrypt.compare(password, user.encryptedPassword, function (err, match) {

        if(err) cb(err);
        if(match) {
          cb(null, true);
        } else {
          cb(err);
        }
      })
    }
};
