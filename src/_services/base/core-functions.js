const Sequelize = require('sequelize');
const DataUtils = require('../../_utils');
const config = require('../../config');

const Op = Sequelize.Op;
const ORDER_ENUM = ['asc', 'desc', 'ascending', 'descending', '1', '-1', 'ascend', 'descend'];
const SEARCHING_EXCLUDE = ['id', 'createdBy', 'updatedBy'];

class CoreService {
    /**
     * Prepare paging options for get list
     */
    preparePagingOptions = (req) => {
        const query = req.query;
        const pageIndex = query.pageIndex || query.page || query.currentPage; // Start from 1
        const pageSize = query.pageSize;
        const sorter = query.sorter; // Support sort by multiple fields, e.g: 'sorter=id_desc,vendor.name_ascending'
        const sorterArr = sorter && sorter.split(',');

        const ret = {};

        if (sorterArr && sorterArr.length > 0) { // Using sorter parameter
            ret.order = sorterArr.map(sorter => {
                const arr = sorter.split('_');

                if (arr.length > 0) {
                    const orderBy = arr[0];
                    const orderType = arr[arr.length - 1];
                    const orderArr = orderBy.split('.');

                    return [...orderArr, getOrderType(orderType)];
                }
            });
        } else { // Using orderBy & orderType parameters
            let orderBy = query.orderBy;
            const orderType = query.orderType;

            orderBy = orderBy ? orderBy.split('.') : [config.query_default_sort];

            ret.order = [[...orderBy, this.getOrderType(orderType)]];
        }

        if (!DataUtils.isNumber(pageIndex)) {
            ret.pageIndex = config.query_default_page_index
        } else {
            ret.pageIndex = DataUtils.toNumber(pageIndex)
        }

        if (!DataUtils.isNumber(pageSize)) {
            ret.pageSize = config.query_default_page_size
        } else {
            if (DataUtils.toNumber(pageSize) > config.query_max_page_size) {
                ret.pageSize = config.query_max_page_size;
            } else {
                ret.pageSize = DataUtils.toNumber(pageSize);
            }
        }

        ret.offset = ret.pageSize * (ret.pageIndex - 1);
        ret.limit = ret.pageSize;

        return ret;
    }

    /**
     * Prepare filter conditions for getlist
     */
    prepareFilterOptions = (req, model, skipInclude = true, include = []) => {
        const query = req.query;
        const { keyword, ...params } = query;

        if (!model) {
            model = this._model;
        }

        const attributes = model.rawAttributes;
        if ((!include || !include.length) && model.include) {
            include = model.include
        }
        const conditions = {};
        const orConditions = [];

        // Process keyword
        if (keyword) {
            const filter = {
                [Op.like]: `%${keyword}%`
            };

            for (let attr in attributes) {
                if ((attributes[attr].type.key === 'STRING' || attributes[attr].type.key === 'TEXT')
                    && !SEARCHING_EXCLUDE.includes(attr)) {
                    orConditions.push({ [attr]: filter });
                }
            }

            if (!skipInclude) {
                include.forEach(item => {
                    const subAttributes = item.model.rawAttributes;

                    for (let attr in subAttributes) {
                        if ((subAttributes[attr].type.key === 'STRING' || subAttributes[attr].type.key === 'TEXT')
                            && !SEARCHING_EXCLUDE.includes(attr)) {
                            orConditions.push({ [`$${item.as}.${attr}$`]: filter });
                        }
                    }
                })
            }
        }

        orConditions.length > 0 && (conditions[Op.or] = orConditions);

        if (params) {
            // Process other params
            Object.keys(params).forEach(field => {
                if (attributes[field]) {
                    switch (attributes[field].type.key) {
                        case 'STRING':
                            if (field.toLocaleLowerCase().includes('name') || attributes[field].type.length > 36) {
                                conditions[field] = {
                                    [Op.like]: `%${params[field]}%`
                                }
                            } else {
                                conditions[field] = params[field];
                            }
                            break;
                        case 'TEXT':
                            conditions[field] = {
                                [Op.like]: `%${params[field]}%`
                            }
                            break;
                        case 'BOOLEAN':
                            conditions[field] = (params[field] === 'true' || params[field] === '1');
                            break;
                        default:
                            conditions[field] = params[field];
                            break;
                    }
                } else if (field.includes('.') && !skipInclude) { // Filter in related tables
                    const alias = field.split('.')[0];
                    const subField = field.split('.')[1];
                    include.forEach(item => {
                        const subAttributes = item.model.rawAttributes;
                        if (item.as === alias && subAttributes[subField]) {
                            switch (subAttributes[subField].type.key) {
                                case 'STRING':
                                    if (subField.toLocaleLowerCase().includes('name') || subAttributes[subField].type.length > 36) {
                                        conditions[`$${field}$`] = {
                                            [Op.like]: `%${params[field]}%`
                                        }
                                    } else {
                                        conditions[`$${field}$`] = params[field];
                                    }
                                    break;
                                case 'TEXT':
                                    conditions[`$${field}$`] = {
                                        [Op.like]: `%${params[field]}%`
                                    }
                                    break;
                                case 'BOOLEAN':
                                    conditions[`$${field}$`] = (params[field] === 'true' || params[field] === '1');
                                    break;
                                default:
                                    conditions[`$${field}$`] = params[field];
                                    break;
                            }
                        }
                    })
                }
            });
        }

        return conditions;
    }

    /**
     * Convert order type in parameter to SQL order type
     */
    getOrderType = (type) => {
        if (!ORDER_ENUM.includes(type)) {
            return config.query_default_order
        } else {
            if (type === '1' || type === 'asc' || type === 'ascending' || type === 'ascend') {
                return 'ASC';
            } else {
                return 'DESC';
            }
        }
    };

    /**
     * Get login user context
     */
    getUserContex = (req) => {
        return req.user;
    }

    /**
     * Get login user id
     */
    getUserId = (req) => {
        const userCtx = this.getUserContex(req);

        if (!userCtx) {
            return null
        }

        return userCtx.userId || userCtx.id;
    }

    /**
     * Get company of login user
     */
    getUserCompany = (req) => {
        const userCtx = this.getUserContex(req);

        if (!userCtx) {
            return null
        }

        return userCtx.plc;
    }
}

module.exports = CoreService;
