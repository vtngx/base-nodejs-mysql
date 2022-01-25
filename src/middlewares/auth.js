const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const APIError = require('../helper/response/apiError');
const config = require('../config');
const { getToken, checkPermission } = require('../_utils/authorization');
const { PERMISSIONS } = require('../common/constants');

module.exports.authJWT = async function (req, res, next) {
    const token = getToken(req);
    const apiError = new APIError({});

    if (!token) {
        apiError.message = 'No token provided!';
        apiError.status = httpStatus.UNAUTHORIZED;
        return next(apiError);
    }

    jwt.verify(token, config.token_secret, async (error, decoded) => {
        if (error) {
            apiError.message = 'Failed to authenticate token!';
            apiError.status = httpStatus.UNAUTHORIZED;
            return next(apiError);
        } else {
            const userId = decoded.id;
            // const { employeeCode, fullName, roles, plc, isAdmin } = decoded;

            req.user = {
                userId,
                /// ... join more fields
            };

            return next();
        }
    })
}

module.exports.authorize = (feature, permission) => {
    return async function (req, res, next) {
        const user = req.user;
        const apiError = new APIError({});

        if (!user) {
            apiError.message = 'You must be logged in to perform this operation!';
            apiError.status = httpStatus.UNAUTHORIZED;
            return next(apiError);
        }

        const { roles, isAdmin } = req.user;

        if (!feature || isAdmin) {
            return next()
        } else {
            if (!permission) { // Auto detect permission for RESTFul request
                const method = req.method;
                switch (method.toString().toLowerCase()) {
                    case 'get':
                        permission = PERMISSIONS.READ;
                        break;
                    case 'post':
                        permission = PERMISSIONS.CREATE;
                        break;
                    case 'put':
                        permission = PERMISSIONS.UPDATE;
                        break;
                    case 'delete':
                        permission = PERMISSIONS.DELETE;
                        break;
                }
            }

            const check = await checkPermission(roles, feature.Code, permission);
            if (check) {
                return next();
            } else {
                apiError.message = 'You are not authorized to perform this operation!';
                apiError.status = httpStatus.FORBIDDEN;
                apiError.errors = {
                    featureCode: feature.Code,
                    featureName: feature.Name,
                    permission
                }
                return next(apiError);
            }
        }
    }
}
