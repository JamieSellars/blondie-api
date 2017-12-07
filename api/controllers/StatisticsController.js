/**
 * StatisticsController
 *
 * @description :: Server-side logic for managing statistics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	properties: function(req, res){

			function capitalize(s) {
				return s[0].toUpperCase() + s.substr(1);
			}

			/**
			*	Dynamically assign the model type for which the statistic is required. such as Type / Category / Assigned
			**/
			var query = req.param("item").toLowerCase();
			var Model = sails.models[query];

			/**
			* Loop through attributes until a similar type is found
			**/
			var matchQuery = query.substr(0, 4);

			var findAttribute;
			for(var attr in sails.models.tickets.attributes)
			{
				if(attr.substr(0, 4).indexOf(matchQuery) > -1)
				{
					findAttribute = attr;
				}
			}

			var statistics = {};

			Tickets.find().limit(100).populate("status").exec(function(err, tickets){

				if(err) return res.send(err);

				Model.find().exec(function(err, attributes){

					if(err) return res.send(err);

					var model = [];

					for(i=0;i<attributes.length;i++)
					{

							statemodel = {};
							statemodel.name = attributes[i].name;

							for(x=1; x < tickets.length; x++){

									var closed = 0, open = 0, total = 0;

									for(var key in tickets){

										if(tickets[key].status.name.toLowerCase() === "closed" && tickets[key][findAttribute] === attributes[i].id){
											closed++;
										}
										if(tickets[key].status.name.toLowerCase() === "open" && tickets[key][findAttribute] === attributes[i].id){
											open++;
										}
										if(tickets[key][findAttribute] == attributes[i].id){
											total++;
										}

									}
							}


							statemodel.closed = closed;
							statemodel.open = open;
							statemodel.total = total;

							model.push(statemodel);
					}

					return res.send(model);

				 });
			});

			// Tickets.find().populate('type').exec(function(err, model){
			//
			// 	statistics.total = model.length;
			//
			// 	console.log(statistics);
			//
			// });

	},

};
