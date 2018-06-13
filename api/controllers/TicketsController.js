/**
 * Tickets COntroller
 *
 * @description :: Server-side logic for managing tickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	*	return list of tickets for Categories
	*/
	all: function(req, res){

		Tickets.query("SELECT TOP 100 * FROM vw_Tickets ORDER BY CreatedAt DESC", function(err,tickets){
		
			if( err ) return res.serverError(err);
			return res.ok(tickets);
			
		})

	},

	/**
	*	return list of tickets for are open (recently)
	*/
	open: function(req, res){

		Statuses.find({name: 'Closed'}).exec(function(err, status){

			if(err) return res.send(err);

			/**
				return only tickets that have NOT been closed
			**/
			
			var statusid = status[0].id;
			// Tickets.find({
			// 	limit: 50,
			// })
			// .where({
			// 	status: { '!': statusid }
			// })
			// 	.populate('assigned')
			// 	select top 50 from tickets
			// 	inner join categotry where tickets.categgoryid = 
			// 	.populate('category')
			// 	.populate('subcategory')
			// 	.populate('type')
			// 	.populate('source')
			// 	.populate('status')
			// 	.populate('created')
			// .then(function(err, tickets){

			// 	if(err) return res.send(err);

			// 	return res.send(tickets);

			// });

		});
	},
	/**
	*	return list of tickets that are closed (recently)
	*/
	closed: function(req, res){

		Statuses.find({
			name: 'Closed',
		}).exec(function(err, status){

			if(err) return res.send(err);

				/**
					return only tickets that have NOT been closed
				**/
				var statusid = status[0].id;
				Tickets.find({
					limit: 5,
				})
				.where({
					status: statusid
				})
					.populate('assigned')
					.populate('category')
					.populate('subcategory')
					.populate('type')
					.populate('source')
					.populate('status')
					.populate('created')

				.sort('updatedAt DESC')

				.then(function(err, tickets){

					if(err) return res.send(err);

						return res.send(tickets);

				});

		});
	},

	/*
		Create new user sent to API via /api/user :POST:
	*/
	create: function(req, res){

			// Add author id as loged in user
			req.body.created = req.token.id;

			Tickets.create(req.body).exec(function(err, ticket){
					if(err) {
						return res.json(err.status, {err: err});
					}
					if(ticket){
						return res.ok("Ticket Created");
					}
			});
	},
	/*
		Get Source By ID
	*/
	get: function(req, res){

			Tickets.find(req.param('id')).exec(function(err, ticket){

				if(err) return res.badRequest(err);

				if(ticket){
					res.ok(ticket[0]);
				}

			});

	},
	/*
		REMOVE DATA
	*/
	destroy: function(req, res){

		Tickets.destroy(req.param('id')).exec(function(err, ticket){

			if(err) return res.badRequest(err);

			if(ticket){
				res.ok("Type destoryed");
			}

		});
	},

	properties: function(req, res){

		// Return all properties & settings available for a new ticket
		var properties = {};

		Categories.find({ 
			where: { statusCode: 1 }
		}).populate('subcategories',{
			where: { statusCode: 1 }
		}).exec(function(err, categories){

				if(err) return res.badRequest(err);
				/*
					ADD CATEGORIES TO PROPERTIES MODEL
				*/
				if(categories){

					properties.categories = categories;

					Types.find().exec(function(err, types){

						if(err) return res.badRequest(err);
						/*
							ADD TYPES TO PROPERTIES MODEL
						*/
						if(types){

							properties.types = types;

							Statuses.find().exec(function(err, statuses){

								if(err) return res.badRequest(err);
								/*
									ADD STATUSES TO PROPERTIES MODEL
								*/
								if(statuses){

									properties.statuses = statuses;

									Statuses.find().exec(function(err, statuses){

										if(err) return res.badRequest(err);
										/*MODEL
											ADD SOURCES TO PROPERTIES 
										*/
										if(statuses){

											properties.statuses = statuses;

											Sources.find().exec(function(err, sources){

												if(err) return res.badRequest(err);
												/*
													ADD SOURCES TO PROPERTIES MODEL
												*/
												if(sources){

													properties.sources = sources;

													Users.find().exec(function(err, users){

														if(err) return res.badRequest(err);
														/*
															ADD SOURCES TO PROPERTIES MODEL
														*/
														if(users){

															properties.users = users;

															return res.ok(properties);

														};
													});
												};
											});
										};
									});
								};
							});
						};
					});
				};
			});
		}
};
