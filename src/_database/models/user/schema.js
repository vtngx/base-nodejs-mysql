const Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  employeeId: {
    type: Sequelize.STRING(36),
    allowNull: false,
    references: {
      model: 'employee',
      key: 'id'
    }
  },
  email: {
    type: Sequelize.STRING(128),
    allowNull: true
  },
  profilePicture: {
    type: Sequelize.STRING(256),
    allowNull: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  lastLoginDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
};
