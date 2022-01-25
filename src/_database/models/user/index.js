const Sequelize = require('sequelize');
const _ = require('lodash');
const BaseModel = require('../base');
const Employee = require('../employee');
const DataUtils = require('../../../_utils/index');

const Op = Sequelize.Op;
const LIST_SEPARATOR = ',';

module.exports = class User extends BaseModel {
    static tableName = 'user';
    static modelName = 'user';
    static schema = require('./schema');
    static include = [
        {
            model: Employee,
            as: 'employee',
            where: {
                isDeleted: 0
            },
            required: true
        }
    ]

    static associate(models) {
        this.belongsTo(models.Employee, { foreignKey: 'employeeId', targetKey: 'id', as: 'employee' });
    }
};
