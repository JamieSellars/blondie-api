
module.exports = {
    
    schema: true,
    connection: 'blondie',
    
    attributes: {
      name: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'string',
        required: true
      }
    }
  };