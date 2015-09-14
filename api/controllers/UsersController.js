/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*
		Provide list of users back to front end
	*/
	all: function(req, res){

			Users.find().exec(function(err, users){

				if(err) return res.badRequest(err);

				if(users){
					res.ok(users);
				}

			});

	},
	/*
		Get User By ID
	*/
	get: function(req, res){

			Users.find(req.param('id')).exec(function(err, user){

				if(err) return res.badRequest(err);

				if(user){
					res.ok(user[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destory: function(req, res){

		  var destroyMe = req.param('id');

			Users.find(destroyMe).exec(function(err, user){
				if(user[0].isAdmin === true){
					res.badRequest("This user cannot be destroyed - admin account");
				} else {

					Users.destroy({ id: destroyMe }).exec(function(err, user){

						if(err) return res.badRequest(err);

						if(user){
							res.ok("User account destoryed");
						}

					});

				}
			});

	},
	/*
		Create new user sent to API via /api/user :POST:
	*/
	create: function(req, res){

			// Generate username
			req.body.username = req.body.firstname.toLowerCase().charAt(0).concat(req.body.lastname.substr(0, req.body.lastname.length).toLowerCase());
			if(req.body.password !== req.body.confirmPassword){
					return res.json(401, { err: 'Password doesn\'t match' })
			}
			Users.create(req.body).exec(function(err, user){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(user){
						res.ok({
							user: user
							//token: jwToken.issue({ id: user.id})
						});
					}
			});
	},
	/*
		Return user data to logged In user.
	*/
	me: function(req, res){

		var userId = req.token.id;

		Users.findOne({ id: userId}).exec(function(err, user){
			if(err) return res.notFound(err);

			if(user){
				return res.ok(user);
			} else {
				return res.forbidden();
			}
		})
	},

	meChangePassword: function(req, res){

		/**
		*	Ensure user's password is correct before updating
		**/
		Users.findOne({id: req.token.id}, function (err, user) {

			if (!user) {
				return res.json(401, {err: 'invalid username or password'});
			}

			Users.comparePassword(req.body.currentPassword, user, function (err, valid) {

				if (err) {
					return res.json(403, {err: 'forbidden'});
				}

				if (valid) {

					Users.update({id: req.token.id}, { password: req.body.password }).exec(function(err, user){

							if(err)	return res.send(err);
							return res.ok("password updated");

					})

				} else {
					return res.send(409, "current password is incorrect");
				}
			});
		});

	},

	/*
		Update details
	*/
	update: function(req, res){

		var userId = req.body.id;

		Users.update({ id: userId },
		{
			firstname:  req.body.firstname,
      lastname:		req.body.lastname,
      email:			req.body.email,
			isManager: 	req.body.isManager
		}
		).exec(function(err, user){

			console.log(err);

			if(err) return res.notFound(err);

			if(user.length >0){
				return res.ok(user);
			}

		})
	},
	/*
		Update Password
	*/
	changePassword: function(req, res){

		var userId = req.body.id;

		Users.findOne({id: userId}).exec(function (err, user) {

			if(err) return res.send(err);

			Users.update({id: user.id}, { password: req.body.password, status: 1 }).exec(function(err, user){

					if(err)	return res.send(err);

					return res.ok("password updated");

			});

		});


	},
};
