const Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  employeeCode: {
    type: Sequelize.STRING(40),
    allowNull: false
  },
  employeeName: {
    type: Sequelize.STRING(256),
    allowNull: true
  }
};
