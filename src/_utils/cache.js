const redis = require('redis');
const bluebird = require('bluebird');
const memcache = require('memory-cache');
const config = require('../config');
const logger = require('./logger');

class Cacher {
    static init() {
        if (config.redis_host) {
            this.useRedis = true;
            bluebird.promisifyAll(redis.RedisClient.prototype);
            bluebird.promisifyAll(redis.Multi.prototype);
            Promise.
                this.client = redis.createClient(config.redis_port, config.redis_host);

            logger.info(`Running Redis cache on ${config.redis_host}:${config.redis_port}`);
            this.client.on('connect', () => {
                logger.info('Redis Connected');
            });
            this.client.on('error', (err) => {
                logger.error(`Redis Error ${err}`);
            });
            this.client.on('end', () => {
                logger.info('Redis Disconnected');
            });
        } else {
            logger.info('Running Memory cache');
            this.client = new memcache.Cache();
        }
    }

    static async get(key) {
        if (!this.client) this.init();
        const storageKey = `${config.name}-${key}`;
        if (this.useRedis) {
            const ret = await this.client.getAsync(storageKey);
            try {
                return JSON.parse(ret);
            } catch (err) {
                return ret;
            }
        } else {
            return this.client.get(storageKey);
        }
    };

    static async set(key, value, time) {
        if (!this.client) this.init();
        const storageKey = `${config.name}-${key}`;
        const expires = time || config.cache_time;
        if (this.useRedis) {
            return this.client.setexAsync(storageKey, expires, JSON.stringify(value));
        }

        return this.client.put(storageKey, value, expires * 1000);
    };

    static async del(key) {
        if (!this.client) this.init();
        const storageKey = `${config.name}-${key}`;
        if (this.useRedis) {
            return this.client.delAsync(storageKey);
        } else {
            return this.client.del(storageKey);
        }
    }
}

module.exports = Cacher;