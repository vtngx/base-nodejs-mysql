const express = require('express');

const { authJWT } = require('../middlewares/auth');
const employee = require('./employee');
const user = require('./user');


class ServicesIndex {
	constructor(app) {
		this.app = app;
		this.router = express.Router();
		this.app.use('/api', this.router);
	}

	registerServices() {
		this.router.use('/employee', authJWT, employee);
		this.router.use('/user', user);
	}
}

module.exports = (app) => {
	return new ServicesIndex(app).registerServices();
};