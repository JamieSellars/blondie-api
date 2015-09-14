/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	open: function(req,res){
		Tickets.find()
		.populate('title')
		.populate('description')
		.populate('assigned')
		.populate('category')
		.populate('subcategory')
		.populate('type')
		.populate('source')
		.populate('status')
		.poulate('created')
	},
	closed: function(req,res){
		res.send("hello");
	}
};
