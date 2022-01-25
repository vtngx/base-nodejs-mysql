const BaseService = require('../base/functions');
const User = require('../../_database/models/user');
const Employee = require('../../_database/models/employee');
const {
    Success
} = require('../../helper/response/apiResponse');
const httpStatus = require('http-status');

class UserService extends BaseService {

    _model = User;
    
    _include = [
        {
            model: Employee,
            as: 'employee'
        }
    ]

    /**
     * Overite create function of BaseService
     */
    // create = async (req, res, next) => {
    //     const userId = this.getUserId(req);

    //     const transaction = await this._model.sequelize.transaction();
    //     try {
    //         const { roles, ...body } = req.body;

    //         body.payGradeId = 0 // TODO: fill by user or move this field to employee

    //         const ret = await this._model.addNew(body, transaction, userId);
    //         if (roles && Array.isArray(roles)) {
    //             await ret.setRoles(roles, {
    //                 through: {
    //                     createdBy: userId,
    //                     updatedBy: userId
    //                 },
    //                 transaction
    //             })
    //         }

    //         transaction.commit();
    //         res.status(httpStatus.CREATED);
    //         res.json(new CreatedSuccess('', ret));
    //     } catch (err) {
    //         transaction.rollback();
    //         logger.warn(`[CREATE-${this._model.modelName}] - `, err.message);
    //         next(err);
    //     }
    // };

    /**
     * Overite update function of BaseService
     */
    // update = async (req, res, next) => {
    //     const id = req.params.id;
    //     const userId = this.getUserId(req);
    //     const conditions = { id }

    //     const transaction = await this._model.sequelize.transaction();
    //     try {
    //         const ret = await this._model.updateRecord(req.body, conditions, transaction, userId);

    //         if (!ret) {
    //             res.status(httpStatus.NOT_FOUND);
    //             res.json(new NotFound('', { id }));
    //         }

    //         if (req.body.roles && Array.isArray(req.body.roles)) {
    //             await ret.setRoles(req.body.roles, {
    //                 through: {
    //                     createdBy: userId,
    //                     updatedBy: userId
    //                 },
    //                 transaction
    //             })
    //         }

    //         transaction.commit();
    //         res.status(httpStatus.OK);
    //         res.json(new Success('Data updated successfully.', ret));
    //     } catch (err) {
    //         transaction.rollback();
    //         logger.warn(`[UPDATE-${this._model.modelName}] - `, err.message);
    //         next(err);
    //     }
    // };

    /**
     * add more function process
     */
    moreFunction = async (req, res, next) => {
        // do something here
        res.status(httpStatus.OK);
        res.json(new Success('More Function Responsed.', {}));
    };

    /**
     * add more function process
     */
     moreFunction2 = async (req, res, next) => {
        // do something here
        res.status(httpStatus.OK);
        res.json(new Success('More Function Two Responsed.', {}));
    };

    /**
     * add more function process
     */
     moreFunctionHaveMiddleware = async (req, res, next) => {
        // do something here
        res.status(httpStatus.OK);
        res.json(new Success('More Function Have Middleware Responsed.', {}));
    };
}

module.exports = UserService;