/**
 * SourcesController
 *
 * @description :: Server-side logic for managing sources
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	*	return list of sources for Categories
	*/
	all: function(req, res){

		Sources.find().exec(function(err, sources){

			if(err) return res.send(err);

			return res.send({ data: sources });

		});
	},
	/*
		Create new user sent to API via /api/user :POST:
	*/
	create: function(req, res){

			Sources.create(req.body).exec(function(err, source){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(source){
						return res.ok(source);
					}
			});
	},
	/*
		Get Source By ID
	*/
	get: function(req, res){

			Sources.find(req.param('id')).exec(function(err, source){

				if(err) return res.badRequest(err);

				if(source){
					res.ok(source[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destroy: function(req, res){

		Sources.destroy(req.param('id')).exec(function(err, source){

			if(err) return res.badRequest(err);

			if(source){
				res.ok("Source destoryed");
			}

		});
	}
};
