const httpStatus = require('http-status');
const logger = require('../../_utils/logger');
const {
    Success,
    CreatedSuccess,
    DeletedSuccess,
    NotFound
} = require('../../helper/response/apiResponse');
const CoreService = require('./core-functions');

class BaseService extends CoreService {
    _model = null;
    _include = null;

    constructor(model, include) {
        super();
        if (model) {
            this._model = model
        }

        if (include) {
            this._include = include;
        }

        if (!this._model && !(this instanceof BaseService)) {
            logger.warn('The model is not set.');
        }
    }

    /**
     * Get single record by id
     */
    getOne = async (req, res, next) => {
        const id = req.params.id || 0;
        const skipInclude = req.query.skipInclude === 'true';

        try {
            const ret = await this._model.getById(id, null, skipInclude, this._include);

            if (!ret) {
                res.status(httpStatus.NOT_FOUND);
                res.json(new NotFound('', { id }));
                return;
            }

            res.status(httpStatus.OK);
            res.json(new Success('', ret));
        } catch (err) {
            logger.warn(`[GET_ONE-${this._model.modelName}] - `, err.message);
            next(err)
        }
    }

    /**
     * Get list data
     */
    getList = async (req, res, next) => {
        try {
            const pagination = this.preparePagingOptions(req);
            const skipInclude = req.query.skipInclude !== 'false';
            const filterConditions = this.prepareFilterOptions(req, null, skipInclude, this._include);
            const ret = await this._model.getAll(filterConditions, null, pagination, skipInclude, this._include);

            const response = {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                totalPages: Math.ceil(ret.count / pagination.pageSize),
                totalRecords: ret.count,
                rows: ret.rows
            }

            res.status(httpStatus.OK);
            res.json(new Success('', response));
        } catch (err) {
            logger.warn(`[GET_LIST-${this._model.modelName}] - `, err.message);
            next(err)
        }
    };

    /**
     * Create new data
     */
    create = async (req, res, next) => {
        const userId = this.getUserId(req);
        try {
            // TODO: Validate here
            const ret = await this._model.addNew(req.body, null, userId);

            res.status(httpStatus.CREATED);
            res.json(new CreatedSuccess('', ret));
        } catch (err) {
            logger.warn(`[CREATE-${this._model.modelName}] - `, err.message);
            next(err)
        }
    };

    /**
     * Update data
     */
    update = async (req, res, next) => {
        const id = req.params.id;
        const userId = this.getUserId(req);
        const conditions = { id }

        try {
            // TODO: Validate here

            const ret = await this._model.updateRecord(req.body, conditions, null, userId);

            if (!ret) {
                res.status(httpStatus.NOT_FOUND);
                res.json(new NotFound('', { id }));
            }

            res.status(httpStatus.OK);
            res.json(new Success('Data updated successfully.', ret));
        } catch (err) {
            logger.warn(`[UPDATE-${this._model.modelName}] - `, err.message);
            next(err)
        }
    };

    /**
     * Soft delete (set isDeleted = 1)
     */
    softDelete = async (req, res, next) => {
        const id = req.params.id;
        const userId = this.getUserId(req);
        const conditions = { id }

        try {
            const ret = await this._model.deleteSoft(conditions, userId);

            if (!ret) {
                res.status(httpStatus.NOT_FOUND);
                res.json(new NotFound('', { id }));
                return;
            }

            res.status(httpStatus.OK);
            res.json(new DeletedSuccess('', ret));
        } catch (err) {
            logger.warn(`[SOFT_DELETE-${this._model.modelName}] - `, err.message);
            next(err)
        }
    };

    /**
     * Hard delete (remove data)
     */
    hardDelete = async (req, res, next) => {
        const id = req.params.id;
        const conditions = { id }
        try {
            await this._model.deleteHard(conditions);

            res.status(httpStatus.OK);
            res.json(new DeletedSuccess('Hard deleted successfully', ret));
        } catch (err) {
            logger.warn(`[HARD_DELETE-${this._model.modelName}] - `, err.message);
            next(err)
        }
    };
}

module.exports = BaseService;
