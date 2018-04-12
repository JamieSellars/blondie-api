/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {

    var username = req.param('username');
    var password = req.param('password');


    if (!username || !password) {
      return res.json(401, {err: 'email and password required'});
    } 

    Users.findOne({ username: username }, function (err, user) {
            
      if(err){
        return res.json(401, { err: err })
      }
      
      if (!user || user.length === 0) {
        return res.json(401, {err: 'invalid username or password'});
      }

      Users.comparePassword(password, user, function (err, valid) {
        

        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid || valid == 'undefined') {

          return res.json(401, {err: 'invalid username or password'});

        } else {

          return res.json({
            user: user,
            token: jwToken.issue({id : user.id })
          });

        }
        
      });
    });
  }
};
