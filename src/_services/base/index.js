const express = require('express');
const func = require('./functions');
const { authorize } = require('../../middlewares/auth');

class BaseRouter extends express.Router {
    constructor(service, enableAuthorize, feature) {
        super();

        if (!service) {
            service = new func(null, null);
        }

        this.get('/list', (req, res, next) => { service.getList(req, res, next) });
        this.post('/add', (req, res, next) => { service.create(req, res, next) });
        this.get('/deails/:id', (req, res, next) => { service.getOne(req, res, next) });
        this.put('/update/:id', (req, res, next) => { service.update(req, res, next) });
        this.delete('/:id/delete', (req, res, next) => { service.softDelete(req, res, next) });
        this.delete('/:id/delete-hard', (req, res, next) => { service.hardDelete(req, res, next) });
    }
};

module.exports = BaseRouter;
