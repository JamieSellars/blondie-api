module.exports = {

    get : (req, res) => {

        LostandFound.find()

            .populate('category')
            .populate('subcategory')
            .populate('location')
            .populate('status')
        
        .exec(function(err, items ){
            
            if(err) return res.send(err);

            return res.send(items);

        });

    },

    geById : (req, res ) => {

        if( req.param('id') == null )
            return res.badRequest();

        var itemId = req.param('id');
            
        LostandFound.find(itemId).exec( (err, item ) => {

            if( err ) return res.serverError(err);

            if( item == null || item.length == 0 ) 
                return res.notFound();

            if( item )
                return res.ok(item);

        });

    },

    delete: (req, res) => {
        
        if( req.param('id') == null )
            return res.badRequest();

        var itemId = req.param('id');

        LostandFound.find(itemId).exec( (err, item ) => {
            
            LostandFound.destroy({ id: itemId }).exec( (err, item ) => {

                return res.ok();

            });

        });

    },


    properties: (req,res) => {

        var properties = {};

        LostandFoundCategories.find().populate('subcategories')
        .then( (categories ) => {
            
            properties.categories = categories;

            return LostandFoundStatuses.find();

        })
        .then( (statuses) => {

            properties.statuses = statuses;

            return LostandFoundLocations.find();

        })
        .then( (locations) => {

            properties.locations = locations;

            return res.ok(properties);

        })
        .catch( (error) => {
          
            return res.serverError(error);
            
        });

    }

}