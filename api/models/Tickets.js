/**
* Tickets.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      title:{
        type: 'string',
        required: true
      },
      description:{
        type: 'string',
        required: true
      },
      assigned:{
        model: 'Users'
      },
      category:{
        model: 'Categories'
      },
      subcategory:{
        model: 'Subcategories'
      },
      type: {
        model: 'types'
      },
      source: {
        model: 'Sources'
      },
      status: {
        model: 'Statuses'
      },
      created: {
        model: 'Users'
      }
  }
};
