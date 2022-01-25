const BaseService = require('../base/functions');
const Employee = require('../../_database/models/employee');
const User = require('../../_database/models/user');

class EmployeeService extends BaseService {
    _model = Employee;
    _include = [
        {
            model: User,
            as: 'users'
        }
    ];
}

module.exports = EmployeeService;