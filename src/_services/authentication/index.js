const express = require('express');
const validate = require('express-validation');
const AuthService = require('./functions');
const {
    login
} = require('../../validations/auth.validation');

class AuthRouter extends express.Router {
    constructor() {
        const service = new AuthService();

        super();
        this.post('/authenticate', validate(login), service.login);
        this.post('/refresh-token', service.refreshToken);
        this.post('/logout', service.logout);
    }
}

module.exports = new AuthRouter();

/**
 * @api {post} /api/auth/authenticate API login
 * @apiDescription API to login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission any
 *
 * @apiParam  (Body) {String}             username              Username
 * @apiParam  (Body) {String}             password              Password
 * @apiParamExample {json} Request-Example:
 *
 * {
 *   "username": "huukhai.nguyen@tcm.tc.net",
 *   "password": "secret"
 * }
 *
 * @apiParamExample {json} Success-Response-Example:
 * {
 *   "message": "Success.",
 *   "code": 200,
 *   "data": {
 *       "id": "5",
 *       "employeeId": "5",
 *       "jobLevelId": 1,
 *       "payGradeId": 1,
 *       "email": "huukhai.nguyen@tanchonggroup.com",
 *       "profilePicture": "https://firebasestorage.googleapis.com/v0/b/tcitech-carmech.appspot.com/o/misc%2Flee-kwang-soo-funny.jpg?alt=media",
 *       "managerId": 1,
 *       "hrId": 1,
 *       "matrixManagerId": 1,
 *       "lastLoginDate": "2020-03-08T00:00:00.000Z",
 *       "isDeleted": false,
 *       "createdBy": "1",
 *       "updatedBy": "1",
 *       "createdAt": "2020-03-09T00:00:00.000Z",
 *       "updatedAt": "2020-03-09T00:00:00.000Z",
 *       "employee": {
 *           "id": "5",
 *           "employeeCode": "huukhai.nguyen",
 *           "employeeName": "Khai",
 *           "position": "2",
 *           "hireDate": null,
 *           "confirmationDate": null,
 *           "managerName": null,
 *           "matrixName": null,
 *           "plc": null,
 *           "department": null,
 *           "section": null,
 *           "branch": null,
 *           "hrpbName": null,
 *           "picture": null,
 *           "isActive": true,
 *           "isDeleted": false,
 *           "createdBy": "1",
 *           "updatedBy": "1",
 *           "createdAt": "2020-03-09T00:00:00.000Z",
 *           "updatedAt": "2020-03-09T00:00:00.000Z"
 *       },
 *       "permissions": {
 *           "sap_jam": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": true
 *           },
 *           "goal_manager": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal_personal": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal_extended": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal_team": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "performance": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "continuous_performance": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "org_chart": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "calibration": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "compensation": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "learning": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "development": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "succession": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "recruting": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "onboarding": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "company_info": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "profile": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "reporting": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "admin_centre": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "route_map": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "employee": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "role": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": true,
 *               "canDelete": false
 *           }
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODQwMjUxMzksImlhdCI6MTU4MzgwOTEzOSwiaWQiOiI1IiwiZW1wbG95ZWVDb2RlIjoiaHV1a2hhaS5uZ3V5ZW4iLCJmdWxsTmFtZSI6IiIsInJvbGVzIjpbeyJpZCI6IjEiLCJyb2xlIjp7ImlkIjoiMSIsInJvbGVOYW1lIjoiZGV2IiwicGFyZW50Um9sZUlkIjoibGVhZGVyIn19LHsiaWQiOiIyIiwicm9sZSI6eyJpZCI6IjMiLCJyb2xlTmFtZSI6InFhIiwicGFyZW50Um9sZUlkIjoibGVhZGVyIn19XX0.C1r3zFP9IIoCLNFRVeQ1b0ZhTdaPkllfzHk4PS8-h8A",
 *       "refreshToken": "qythhtqphtqwptcmqgwybcntgcqwtycpqwgtqogtq"
 *   }
 * }
 *
 * @apiSuccess {String}            code                 Response code
 * @apiSuccess {String}            message              Response message
 * @apiSuccess {Object}            data                 User information with authentication token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Authenticate failed.
 * @apiError (Unprocessable Entity 422)     Unprocessable Entity     Validation failed.
 */

 /**
 * @api {post} /api/auth/refresh-token Refresh token
 * @apiDescription API to refresh token
 * @apiVersion 1.0.0
 * @apiName Refresh token
 * @apiGroup Authentication
 * @apiPermission any
 * 
 * @apiParam  (Body) {String}             refreshToken              Refresh token
 * @apiParamExample {json} Request-Example:
 *
 * {
 *   "refreshToken": "AhdfsghslLkHKGGuGjkbhfGKJHbjkGjYklHlGkgbjkn"
 * }
 *
 * @apiParamExample {json} Success-Response-Example:
 * {
 *   "message": "Success.",
 *   "code": 200,
 *   "data": {
 *       "id": "5",
 *       "employeeId": "5",
 *       "jobLevelId": 1,
 *       "payGradeId": 1,
 *       "email": "huukhai.nguyen@tanchonggroup.com",
 *       "profilePicture": "https://firebasestorage.googleapis.com/v0/b/tcitech-carmech.appspot.com/o/misc%2Flee-kwang-soo-funny.jpg?alt=media",
 *       "managerId": 1,
 *       "hrId": 1,
 *       "matrixManagerId": 1,
 *       "lastLoginDate": "2020-03-08T00:00:00.000Z",
 *       "isDeleted": false,
 *       "createdBy": "1",
 *       "updatedBy": "1",
 *       "createdAt": "2020-03-09T00:00:00.000Z",
 *       "updatedAt": "2020-03-09T00:00:00.000Z",
 *       "employee": {
 *           "id": "5",
 *           "employeeCode": "huukhai.nguyen",
 *           "employeeName": "Khai",
 *           "position": "2",
 *           "hireDate": null,
 *           "confirmationDate": null,
 *           "managerName": null,
 *           "matrixName": null,
 *           "plc": null,
 *           "department": null,
 *           "section": null,
 *           "branch": null,
 *           "hrpbName": null,
 *           "picture": null,
 *           "isActive": true,
 *           "isDeleted": false,
 *           "createdBy": "1",
 *           "updatedBy": "1",
 *           "createdAt": "2020-03-09T00:00:00.000Z",
 *           "updatedAt": "2020-03-09T00:00:00.000Z"
 *       },
 *       "permissions": {
 *           "sap_jam": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": true
 *           },
 *           "goal_manager": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal_personal": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
  *           "goal_extended": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "goal_team": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "performance": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "continuous_performance": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "org_chart": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "calibration": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "compensation": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "learning": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "development": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "succession": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "recruting": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "onboarding": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "company_info": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "profile": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "reporting": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "admin_centre": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "route_map": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "employee": {
 *               "canView": true,
 *               "canAdd": false,
 *               "canEdit": false,
 *               "canDelete": false
 *           },
 *           "role": {
 *               "canView": true,
 *               "canAdd": true,
 *               "canEdit": true,
 *               "canDelete": false
 *           }
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODQwMjUxMzksImlhdCI6MTU4MzgwOTEzOSwiaWQiOiI1IiwiZW1wbG95ZWVDb2RlIjoiaHV1a2hhaS5uZ3V5ZW4iLCJmdWxsTmFtZSI6IiIsInJvbGVzIjpbeyJpZCI6IjEiLCJyb2xlIjp7ImlkIjoiMSIsInJvbGVOYW1lIjoiZGV2IiwicGFyZW50Um9sZUlkIjoibGVhZGVyIn19LHsiaWQiOiIyIiwicm9sZSI6eyJpZCI6IjMiLCJyb2xlTmFtZSI6InFhIiwicGFyZW50Um9sZUlkIjoibGVhZGVyIn19XX0.C1r3zFP9IIoCLNFRVeQ1b0ZhTdaPkllfzHk4PS8-h8A"
 *   }
 * }
 *
 * @apiSuccess {String}            code                 Response code
 * @apiSuccess {String}            message              Response message
 * @apiSuccess {Object}            data                 User information with authentication token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Authenticate failed.
 */

 /**
 * @api {post} /api/auth/logout API logout
 * @apiDescription API to remove refresh token
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Authentication
 * @apiPermission any
 * 
 * @apiParam  (Body) {String}             refreshToken              Refresh token
 * @apiParamExample {json} Request-Example:
 *
 * {
 *   "refreshToken": "AhdfsghslLkHKGGuGjkbhfGKJHbjkGjYklHlGkgbjkn"
 * }
 *
 * @apiSuccess {String}            code                 Response code
 */