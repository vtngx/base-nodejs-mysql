const Joi = require('joi');

module.exports = {
    login: {
        body: {
            username: Joi.string().required().max(128),
            password: Joi.string().required().max(128),
        },
    }
};
