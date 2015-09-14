/**
 * StatusesController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 module.exports = {
 	/**
 	*	return list of statuses for Categories
 	*/
 	all: function(req, res){

 		Statuses.find().exec(function(err, statuses){

 			if(err) return res.send(err);

 			return res.send(statuses);

 		});
 	},
 	/*
 		Create new user sent to API via /api/user :POST:
 	*/
 	create: function(req, res){

 			Statuses.create(req.body).exec(function(err, status){
 					if(err) {
 						return res.json(err.status, {err: err});
 					}
 					if(status){
 						return res.ok(status);
 					}
 			});
 	},
 	/*
 		Get Source By ID
 	*/
 	get: function(req, res){

 			Statuses.find(req.param('id')).exec(function(err, status){

 				if(err) return res.badRequest(err);

 				if(status){
 					res.ok(status[0]);
 				}

 			});

 	},
 	/*
 		REMOVE DATA
 	*/
 	destroy: function(req, res){

 		Statuses.destroy(req.param('id')).exec(function(err, status){

 			if(err) return res.badRequest(err);

 			if(status){
 				res.ok("Source destoryed");
 			}

 		});
 	}
 };
