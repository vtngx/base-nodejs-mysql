const _ = require('lodash');
const jwt = require('jsonwebtoken');
const cache = require('./cache');
const config = require('../config');
const {
    FEATURES,
    PERMISSIONS
} = require('../common/constants');
const logger = require('./logger');

const getToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.length > 0) {
        return req.headers.authorization.split(/\s+/)[1];
    }

    return '';
};

const check = async (role, feature, permission) => {
    const key = `role-${role}`;
    let permissions = await cache.get(key);

    if (!permissions) {
        logger.info('Get permissions from db: ', role)
        const roleData = await Role.getOne({ id: role, isActive: true });
        if (roleData) {
            permissions = roleData.toJSON().permissions;
            cache.set(key, permissions, 30);
        }
    } else {
        logger.info('Get permissions from cache: ', role)
    }

    return _.some(permissions, o => {
        return (
            o.feature === feature &&
            (
                (permission === PERMISSIONS.READ && o.canView === true)
                || (permission === PERMISSIONS.CREATE && o.canAdd === true)
                || (permission === PERMISSIONS.UPDATE && o.canEdit === true)
                || (permission === PERMISSIONS.DELETE && o.canDelete === true)
            )
        )
    })
};

const checkPermission = async (roles, feature, permission) => {
    if (!_.some(FEATURES, ['Code', feature])) {
        logger.warn(`The feature [${feature}] does not exist.`)
        return false
    }

    if (Array.isArray(roles)) {
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            const hasPermission = await check(role, feature, permission);
            if (hasPermission) {
                return true;
            }
        }

        return false;
    }
    const hasPermission = await check(roles, feature, permission);
    return hasPermission;
};

const getTokenDecoded = (token) => {
    try {
        return jwt.verify(token, config.token_secret);
    } catch (err) {
        return undefined
    }
}

module.exports = {
    getToken,
    // check,
    checkPermission,
    getTokenDecoded
}