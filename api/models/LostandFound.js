
module.exports = {
    schema: true,
    connection: 'blondie',
    attributes: {

        category:{
          model: 'LostandFoundCategories'
        },
        subcategory:{
          model: 'LostandFoundSubcategories'
        },
        location: {
          model: 'LostandFoundLocations'
        },
        status: {
          model: 'LostandFoundStatuses'
        },
        created: {
          model: 'Users'
        },
        dateIn: {
          type: 'date',
        },
        dateOut: {
          type: 'date',
        },
        contactName: {
          type: 'string',
        },
        contactNumber: {
          type: 'string',
        },
        contactEmail: {
          type: 'string',
        },
        itemName: {
          type: 'string'          
        },
        description: {
          type: 'string'
        }
    }
  };
  