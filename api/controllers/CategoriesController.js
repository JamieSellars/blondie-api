/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categorys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	*	return list of categorys for Categories
	*/
	all: function(req, res){

		Categories.find().exec(function(err, categorys){

			if(err) return res.send(err);

			return res.send({ data: categorys });

		});
	},
	/*
		Create new user sent to API via /api/user :POST:
	*/
	create: function(req, res){

			Categories.create(req.body).exec(function(err, category){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(category){
						return res.ok(category);
					}
			});
	},
	/*
		Get Category By ID
	*/
	get: function(req, res){


			Categories.find(req.param('id'))
			.exec(function(err, category){


				if(err) return res.badRequest(err);

				if(category){
					res.ok(category[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destroy: function(req, res){

		var id = parseInt(req.param('id'));

		Categories.update({ id: id })
		.set({ statusCode: 0 }).exec( (err, result) => {
			
			console.log(result);

			if( err ) return res.serverError( err );

			return res.ok();

		});
		
	},

	activate: function(req, res){

		var id = parseInt(req.param('id'));

		Categories.update({ id: id })
		.set({ statusCode: 1 }).exec( (err, result) => {
			
			if( err ) return res.serverError( err );

			return res.ok();

		});
		
	}
};
