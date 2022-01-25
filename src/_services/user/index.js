const BaseRouter = require('../base');
const UserService = require('./functions');

const { authorize } = require('../../middlewares/auth');

class UserRouter extends BaseRouter {
    constructor() {
        const service = new UserService();
        super(service);
        
        this.get('/get-list-for-calibration', service.moreFunction);
        this.post('/get-list-for-calibration1', service.moreFunction2);
        
        this.delete('/moreApi1/haveMiddleWares', authorize(), service.moreFunctionHaveMiddleware);
    }
};

module.exports = new UserRouter();

// API Docs for User

/**
 * @api {get} /api/user Get user list
 * @apiDescription Get a list of User
 * @apiVersion 1.0.0
 * @apiName List Users
 * @apiGroup User Management
 * @apiPermission logged user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]             Page number
 * @apiParam  {Number{1-}}         [pageSize]           Items per page
 * @apiParam  {String}             [orderBy=createdAt]  Field to sort data
 * @apiParam  {String='asc','desc'}[orderType=desc]     Sort type
 * @apiParam  {String}             [keyword]            Keyword for searching data
 * @apiParam  {String}             [employeeId]         Employee id
 * @apiParam  {String}             [jobLevelId]         Job level id
 * @apiParam  {String}             [payGradeId]         Pay grade id
 * @apiParam  {String}             [email]              Email
 * @apiParam  {String}             [managerId]          Manager id
 * @apiParam  {String}             [hrId]               Human resource manager id
 * @apiParam  {String}             [matrixManagerId]    Matrix manager id
 * @apiParam  {Boolean}            [isAdmin]            Filter by admin flag
 * @apiParam  {Boolean}            [isLocked]           Filter by lock status
 * @apiParam  {Boolean}            [isActive]           Filter by activation status
 * @apiParam  {Boolean}            [skipInclude=true]   Set false if you want to get data with related tables
 *
 * @apiSuccess {String}            code                 Response code
 * @apiSuccess {String}            message              Response message
 * @apiSuccess {Object}            data                 Response data include: pageIndex, pageSize, totalPages, totalRecords and rows.
 * @apiSuccess {Number}            data.pageIndex       Page number
 * @apiSuccess {Number}            data.pageSize        Page size
 * @apiSuccess {Number}            data.totalPages      Total pages
 * @apiSuccess {Number}            data.totalRecords    Total records
 * @apiSuccess {Object[]}          data.rows            The list of user data
 *
 * @apiSuccessExample {json} Success-Response:
 *{
 *    "message": "Success.",
 *    "code": 200,
 *    "data": {
 *        "pageIndex": 1,
 *        "pageSize": 2,
 *        "totalPages": 16,
 *        "totalRecords": 31,
 *        "rows": [
 *            {
 *                "id": "399ebab1-6ef8-11ea-b733-b73534aeb73f",
 *                "employeeId": "399ebab0-6ef8-11ea-b733-b73534aeb73f",
 *                "jobLevelId": null,
 *                "payGradeId": 0,
 *                "email": "ryan.chan@tanchonggroup.com",
 *                "profilePicture": null,
 *                "managerId": null,
 *                "hrId": null,
 *                "matrixManagerId": null,
 *                "isAdmin": false,
 *                "isLocked": false,
 *                "isActive": true,
 *                "lastLoginDate": "2020-03-08T00:00:00.000Z",
 *                "isDeleted": false,
 *                "createdBy": "",
 *                "updatedBy": "",
 *                "createdAt": "2020-03-26T00:24:58.000Z",
 *                "updatedAt": "2020-03-26T00:24:58.000Z"
 *            },
 *            {
 *                "id": "20",
 *                "employeeId": "20",
 *                "jobLevelId": null,
 *                "payGradeId": 0,
 *                "email": "thong0@tanchonggroup.com",
 *                "profilePicture": "https://i.imgur.com/wfDHjIS.jpg",
 *                "managerId": null,
 *                "hrId": null,
 *                "matrixManagerId": null,
 *                "isAdmin": false,
 *                "isLocked": false,
 *                "isActive": true,
 *                "lastLoginDate": "2020-03-08T00:00:00.000Z",
 *                "isDeleted": false,
 *                "createdBy": "6",
 *                "updatedBy": "6",
 *                "createdAt": "2020-03-16T02:16:15.000Z",
 *                "updatedAt": "2020-03-18T04:57:15.000Z"
 *            }
 *        ]
 *    }
 *}
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only logged user can access the data
 */