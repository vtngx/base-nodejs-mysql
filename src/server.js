const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// const services = require('./_services');
const environment = require('./_utils/environment');
const logger = require('./_utils/logger');
const config = require('./config');
const error = require('./middlewares/error');
const cache = require('./_utils/cache');

// Configuring cors
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/docs', express.static('docs'));
// request logging. dev: console | production: file
app.use(morgan(config.morgan_format, { stream: logger.stream }));
app.get('/', (req, res) => res.send('App is working'));

// services(app);

const initService = () => {
    const services = require('./_services');
    logger.info('Init - Register services.');
    services(app);
    logger.info(`Init - Register services '${services.name}' successfully.`);
    return;
};

const initSequelize = () => {
    const db = require('./_database/db');

    logger.info('Init - Establish connection.');

    return db
        .connect()
        .then(() => {
            logger.info('Init - Establish connection successfully.');
            return true;
        })
        .catch(err => {
            logger.error('Init - Establish connection fail:', err);
            return false;
        });
};

const initCache = () => {
    cache.init();
}

const handleError = () => {
    // if error is not an instanceOf APIError, convert it.
    app.use(error.converter);

    // catch 404 and forward to error handler
    app.use(error.notFound);

    // error handler, send stacktrace only during development
    app.use(error.handler);

    return;
}

const startServer = async () => {
    app.listen(config.port, config.host);
    logger.info(`Listening on host ${config.host} on port ${config.port} http://${config.host}:${config.port}`);
};

// startServer();

environment
    .getEnvironmentSetting()
    // .then(registerMiddleware.bind(this, app))
    .then(initCache.bind(this))
    .then(initService.bind(this))
    .then(handleError.bind(this))
    .then(initSequelize.bind(this))
    // .then(migrateSequelize.bind(this))
    .then(startServer.bind(this))
    .catch(error => {
        logger.error('Startup Error: ', error);
    });

module.exports = app;
