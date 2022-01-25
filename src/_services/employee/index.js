const BaseRouter = require('../base');
const EmployeeService = require('./functions');

class EmployeeRouter extends BaseRouter {
    constructor() {
        const service = new EmployeeService();
        super(service);
    }
};

module.exports = new EmployeeRouter();

// API Docs for Employee

/**
 * @api {get} /api/Employee Get Employee list
 * @apiDescription Get a list of Employee
 * @apiVersion 1.0.0
 * @apiName List Employees
 * @apiGroup Employee
 * @apiPermission logged user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]             Page number
 * @apiParam  {Number{1-}}         [pageSize]           Items per page
 * @apiParam  {String}             [orderBy=createdAt]  Field to sort data
 * @apiParam  {String='asc','desc'}[orderType=desc]     Sort type
 * @apiParam  {String}             [keyword]            Keyword for searching data
 * @apiParam  {String}             [employeeCode]       Employee code
 * @apiParam  {String}             [employeeName]       Employee name
 * @apiParam  {String}             [position]           Employee position
 * @apiParam  {String}             [managerName]        Manager name
 * @apiParam  {String}             [matrixName]         Matrix name
 * @apiParam  {String}             [plc]                PLC
 * @apiParam  {String}             [department]         Department
 * @apiParam  {String}             [section]            Section
 * @apiParam  {String}             [branch]             Branch
 * @apiParam  {Boolean}            [isActive]           Active status
 * @apiParam  {Boolean}            [skipInclude=true]   Set false if you want to get data with related tables
 *
 * @apiSuccess {String}            code                 Response code
 * @apiSuccess {String}            message              Response message
 * @apiSuccess {Object}            data                 Response data include: pageIndex, pageSize, totalPages, totalRecord and rows.
 * @apiSuccess {Number}            pageIndex            Page number
 * @apiSuccess {Number}            pageSize             Page size
 * @apiSuccess {Number}            totalPages           Total pages
 * @apiSuccess {Number}            totalRecord          Total records
 * @apiSuccess {Object[]}          rows                 Objective data
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "message": "Success.",
 *    "code": 200,
 *    "data": {
 *        "pageIndex": 1,
 *        "pageSize": 15,
 *        "totalPages": 1,
 *        "totalRecord": 4,
 *        "rows": [
 *            {
 *               "id": "7c53aa10-6376-11ea-9f4a-f72eb72a3547",
 *               "employeeCode": "70064702",
 *               "employeeName": "Lim Zhi Qing",
 *               "position": null,
 *               "hireDate": null,
 *               "confirmationDate": null,
 *               "managerName": null,
 *               "matrixName": null,
 *               "plc": "TCM",
 *               "department": null,
 *               "section": null,
 *               "branch": null,
 *               "hrpbName": null,
 *               "picture": null,
 *               "isActive": true,
 *               "profilePictureUrl": "https://www.w3schools.com/html/img_chania.jpg",
 *               "isDeleted": false,
 *               "createdBy": "sys",
 *               "updatedBy": "sys",
 *               "createdAt": "2020-03-11T08:58:33.000Z",
 *               "updatedAt": "2020-03-11T08:58:33.000Z"
 *           },
 *           {
 *               "id": "ac02a230-629e-11ea-902f-8968ccc67db2",
 *               "employeeCode": "70065772",
 *               "employeeName": "Asma Shahir Bin Mohd Saleh",
 *               "position": null,
 *               "hireDate": null,
 *               "confirmationDate": null,
 *               "managerName": null,
 *               "matrixName": null,
 *               "plc": "TCM",
 *               "department": null,
 *               "section": null,
 *               "branch": null,
 *               "hrpbName": null,
 *               "picture": null,
 *               "isActive": true,
 *               "profilePictureUrl": "https://www.w3schools.com/html/img_chania.jpg",
 *               "isDeleted": false,
 *               "createdBy": "sys",
 *               "updatedBy": "sys",
 *               "createdAt": "2020-03-10T07:13:41.000Z",
 *               "updatedAt": "2020-03-10T07:13:41.000Z"
 *           }
 *        ]
 *    }
 * }
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only logged user can access the data
 */
