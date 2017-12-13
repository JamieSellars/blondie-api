module.exports = {

    get : (req, res) => {

        LostandFoundLocations.find().exec(function(err, items ){
            
            if(err) return res.send(err);

            return res.send(items);

        });

    },

    geById : (req, res ) => {

        if( req.param('id') == null )
            return res.badRequest();

        var itemId = req.param('id');
            
        LostandFoundLocations.find(itemId).exec( (err, item ) => {

            if( err ) return res.serverError(err);

            if( item == null || item.length == 0 ) 
                return res.notFound();

            if( item )
                return res.ok(item);

        });

    },

    create: (req, res) => {

        var item = req.body;

        LostandFoundLocations.create(item).exec( (err, item ) => {

            if( !item || item == null )
                return res.serverError();

            return res.ok(item);

        });

    },

    delete: (req, res) => {

        if( req.param('id') == null )
            return res.badRequest();

        var itemId = req.param('id');

        LostandFoundLocations.find(itemId).exec( (err, item ) => {
            
            LostandFoundLocations.destroy({ id: itemId }).exec( (err, item ) => {

                return res.ok();

            });

        });

    }



}