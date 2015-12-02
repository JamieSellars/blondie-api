/**
 * TypesController
 *
 * @description :: Server-side logic for managing types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	*	return list of types for Categories
	*/
	all: function(req, res){

		Types.find().exec(function(err, types){
			
				console.log(types);
			
			if(err) return res.send(err);

			return res.send({ data: types });

		});
	},
	/*
		Create new user sent to API via /api/user :POST:
	*/
	create: function(req, res){

			Types.create(req.body).exec(function(err, type){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(type){
						return res.ok(type);
					}
			});
	},
	/*
		Get Source By ID
	*/
	get: function(req, res){

			Types.find(req.param('id')).exec(function(err, type){

				if(err) return res.badRequest(err);

				if(type){
					res.ok(type[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destroy: function(req, res){

		Types.destroy(req.param('id')).exec(function(err, type){

			if(err) return res.badRequest(err);

			if(type){
				res.ok("Type destoryed");
			}

		});
	}
};
