const BaseModel = require('../base');
const User = require('../user');

module.exports = class Employee extends BaseModel {
    static tableName = 'employee';
    static modelName = 'employee';
    static schema = require('./schema');
    static include = [
        {
            model: User,
            as: 'user'
        }
    ]

    static associate(models) {
        this.hasOne(models.User, { foreignKey: 'employeeId', targetKey: 'id', as: 'user' });
    }
};
