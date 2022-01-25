const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../../config');
const DataUtils = require('../../_utils');

module.exports = class BaseModel extends Sequelize.Model {
    static tableName = '';
    static modelName = '';
    static schema = {};
    static timestamps = true;
    static include = null;

    /**
     * Initial model
     * @param {Object} sequelize Sequelize instance
     */
    static init(sequelize) {
        if (!this.tableName || !this.modelName || !Object.keys(this.schema).length) {
            throw new Error('The model name, table name and schema cannot be empty!')
        }

        return super.init({
            ...this.schema,
            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdBy: {
                type: Sequelize.STRING,
                allowNull: false
            },
            // createdAt: {
            //     type: Sequelize.DATE
            // },
            updatedBy: {
                type: Sequelize.STRING,
                allowNull: false
            },
            // updatedAt: {
            //     type: Sequelize.DATE
            // }
        }, {
            tableName: this.tableName,
            modelName: this.modelName,
            sequelize,
            timestamps: this.timestamps
        });
    }

    // Associations
    static associate(models) {
        // this.hasMany(models.MODEL_NAME, { foreignKey: 'fkId', as: 'alias' });
    }

    /**
     * Get one record
     * @param {Object} where Where conditions
     * @param {Array} attributes List of fields
     * @param {Boolean} skipInclude Set true if want to get result with including
     * @param {Array} include Custom include option (available when skipInclude is false)
     * 
     * @returns {Promise} Instance of model
     */
    static getOne(where = {}, attributes, skipInclude = false, include, transaction, options = {}) {
        Object.assign(options, {
            where: {
                ...where,
                isDeleted: {
                    [Op.not]: true
                }
            },
            order: [
                ["createdAt", "DESC"]
            ],
            transaction
        })

        if (!skipInclude && (include || this.include)) {
            options.include = include || this.include;
        }

        if (attributes) {
            options.attributes = attributes;
        }

        return this.findOne(options);
    }

    /**
     * Get one record by id
     * @param {String} id Id to search 
     * @param {Array} attributes List of fields
     * @param {Boolean} skipInclude Set true if want to get result with including
     * @param {Array} include Custom include option (available when skipInclude is false)
     * 
     * @returns {Promise} Instance of model
     */
    static getById(id = '', attributes, skipInclude = false, include) {
        const options = {
            where: {
                id,
                isDeleted: {
                    [Op.ne]: true
                }
            }
        };

        if (!skipInclude && (include || this.include)) {
            options.include = include || this.include;
        }

        if (attributes) {
            options.attributes = attributes;
        }

        return this.findOne(options);
    }

    /**
     * Get data with paging
     * @param {Object} conditions Where conditions
     * @param {Array} attributes List of fields
     * @param {Number} pageIndex Page index (start from 1)
     * @param {Number} pageSize Page size
     * @param {Array} orderBy SQL order option
     * @param {Boolean} skipInclude Set true if want to get result with including
     * @param {Array} include Custom include option (available when skipInclude is false)
     * 
     * @returns {Promise} Object contents pagination and rows data
     */
    static getAll(conditions, attributes, pagination, skipInclude = true, include, groupBy, subQuery = false, distinct) {
        let limit = config.query_default_page_size;
        let offset = config.query_default_page_size * (config.query_default_page_index - 1);
        let order = [[config.query_default_sort, config.query_default_order]];

        if (pagination) {
            limit = pagination.limit;
            offset = pagination.offset;
            order = pagination.order;
        }

        const options = {
            where: {
                ...conditions,
                isDeleted: {
                    [Op.ne]: true
                }
            },
            limit,
            offset,
            order,
            subQuery,
        };

        if (!skipInclude && (include || this.include)) {
            options.include = include || this.include;
        }

        if (groupBy) {
            options.group = groupBy;
        }
        if (attributes) {
            options.attributes = attributes;
        }
        if (distinct) {
            options.distinct = true;
        }

        return this.findAndCountAll(options);
    }

    /**
     * Create new record
     * @param {Object} data New data
     * @param {Object} transaction Sequelize transaction
     * 
     * @returns {Promise} Create promise
     */
    static addNew(data, transaction, who, skipInclude = true, include) {
        if (who) {
            data.createdBy = who;
            data.updatedBy = who;
        }

        const options = {
            returning: true,
            transaction: transaction
        };

        if (!skipInclude && (include || this.include)) {
            options.include = include || this.include;
        }

        return this.create(data, options);
    }

    /**
     * Update data
     * @param {Object} record New data
     * @param {Object} where Filter conditions
     * @param {Object} transaction Sequelize transaction
     * @param {String} who User perform the action
     * 
     * @returns {Promise} Update promise
     */
    static async updateRecord(data, where, transaction, who, skipInclude = true, include) {
        const options = {
            where,
            transaction: transaction,
            validate: true
        };

        if (!skipInclude && (include || this.include)) {
            options.include = include || this.include;
        }
        const record = await this.findOne(options);

        if (!record) {
            return null;
        }

        Object.keys(data).forEach(field => {
            record[field] = data[field];
        })

        if (who) {
            record.updatedBy = who;
        }

        await record.save({ transaction });
        return record;
    }

    /**
     * Hard delete
     * @param {Object} where Delete conditions
     * 
     * @returns {Promise} Hard dalete promise
     */
    static deleteHard(where, transaction) {
        return this.destroy({
            where: where,
            transaction
        });
    }

    /**
     * Soft delete
     * @param {Object} where Delete conditions
     * @param {String} who User id
     * 
     * @returns {Promise} Soft delete promise
     */
    static async deleteSoft(where, who, transaction) {
        const record = await this.findOne({ where });

        if (!record) {
            return null;
        }

        record.isDeleted = true;

        if (who) {
            record.updatedBy = who;
        }

        await record.save({ transaction });
        return record;
    }
};
