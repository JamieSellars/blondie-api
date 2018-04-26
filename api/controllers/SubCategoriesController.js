/**
 * SubCategoriesController
 *
 * @description :: Server-side logic for managing subcategorys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	*	return list of subcategorys for SubCategories
	*/
	all: function(req, res){

		var categoryId = req.param('catid');

		Categories.find({ id: categoryId }).populate('subcategories').exec(function(err, subcategories){

			if(err) return res.send(err);

			return res.send({ data: subcategories });

		});
	},
	/*
		Create new user sent to API via /api/subcategories :POST:
	*/
	create: function(req, res){

			SubCategories.create(req.body).exec(function(err, subcategory){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(subcategory){
						return res.ok(subcategory);
					}
			});
	},
	/*
		Get Category By ID
	*/
	get: function(req, res){

			SubCategories.find(req.param('id')).exec(function(err, subcategory){

				if(err) return res.badRequest(err);

				if(subcategory){
					res.ok(subcategory[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destroy: function(req, res){

		var id = parseInt(req.param('id'));

		SubCategories.update({ id: id })
		.set({ statusCode: 0 }).exec( (err, result) => {
			
			console.log(result);

			if( err ) return res.serverError( err );

			return res.ok();

		});
		
	},

	activate: function(req, res){

		var id = parseInt(req.param('id'));

		SubCategories.update({ id: id })
		.set({ statusCode: 1 }).exec( (err, result) => {
			
			if( err ) return res.serverError( err );

			return res.ok();

		});
		
	}
};
