'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sample_table', [{
      name: 'John',
      desc: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:  
    */
      return queryInterface.bulkDelete('sample_table', null, {});
  
  }
};
