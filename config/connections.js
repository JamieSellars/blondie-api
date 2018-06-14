module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  blondie: {
    adapter: 'sails-sqlserver',
    user: 'blondieweb',
    password: 'Blondie123',
    host: 'PBSQLPA',
    database: 'Blondie',
    options: {
      encrypt: false
    }
  },

};
