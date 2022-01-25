const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const SequelizeError = require('sequelize').Error;
const { 
    Promise,
    ValidationError,
    ForeignKeyConstraintError
 } = require('sequelize');
const APIError = require('../helper/response/apiError');
const config = require('../config');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (config.env !== 'development' && config.env !== 'localhost') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
    let convertedError = err;

    if (err instanceof SequelizeError) {
        if (err.name.includes(ValidationError.name)) {
            convertedError = new APIError({
                message: 'Validation Error',
                errors: err.errors.map(item => {
                    return {
                        path: item.path,
                        message: item.message
                    }
                }),
                status: httpStatus.UNPROCESSABLE_ENTITY,
                // stack: err.stack,
            });
        } else if (err.name.includes(ForeignKeyConstraintError.name)) {
            convertedError = new APIError({
                message: 'Validation Error',
                errors: err.fields.map(field => {
                    return {
                        path: field,
                        message: 'Data does not exist in reference table.' // err.message
                    }
                }),
                status: httpStatus.UNPROCESSABLE_ENTITY,
                // stack: err.stack,
            });
        } else {
            convertedError = new APIError({
                message: 'Database Error',
                errors: err.message,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: err.stack,
            });
        }
    } else if (err instanceof Promise.AggregateError) {
        const errors = {};
        err.forEach(item => {
            item.errors.errors.forEach(e => {
                errors[e.path] = e.message;
            })
        })

        convertedError = new APIError({
            message: 'Validation Error',
            errors: Object.keys(errors).map(item => {
                return {
                    path: item,
                    message: errors[item]
                }
            }),
            status: httpStatus.UNPROCESSABLE_ENTITY,
            // stack: err.stack,
        });
    } else if (err instanceof expressValidation.ValidationError) {
        convertedError = new APIError({
            message: 'Validation Error',
            errors: err.errors.map(err => {
                return {
                    path: err.field[0],
                    message: err.messages.toString().replace(/"/g, '')
                }
            }),
            status: httpStatus.UNPROCESSABLE_ENTITY,
            stack: err.stack,
        });
    } else if (!(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }

    return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
    const err = new APIError({
        message: 'URL Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};
