/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*': ['isAuthenticated'], // Everything resctricted here
  /**
  *
  *   @description: User Controller Policy
  *
  **/
  'UsersController': {
      '*': 'isManager',
      'me': 'isAuthenticated',
      'meChangePassword': 'isAuthenticated',
  },

  /**
  *
  *   @description: Protect settings / admin area
  *
  **/
  'CategoriesController':     ['isAuthenticated','isManager'],
  'SubCategoriesController':  ['isAuthenticated','isManager'],
  'StatusesController':       ['isAuthenticated','isManager'],
  'SourcesController':        ['isAuthenticated','isManager'],
  'TypesController':          ['isAuthenticated','isManager'],

  /**
  *
  *   @description: Authentication: allow any
  *
  **/
  'AuthController': {
    '*': true
  }

};
