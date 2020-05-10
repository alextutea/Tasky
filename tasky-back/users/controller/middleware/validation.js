const Joi = require('@hapi/joi');
const {validateBody, validateQuery, validateParams} = require('../../../utils/validationHelpers.js')

const getUsersQueryValidation = query => {
    const schema = Joi.object({
        id: Joi.string(),
        username: Joi.string(),
        email: Joi.string(),
        level: Joi.string()
    });
    return schema.validate(query);
}

const updateUsersBodyValidation = body => {
    const schema = Joi.object({
        targets: Joi.object({
            id: Joi.string(),
            username: Joi.string(),
            email: Joi.string(),
            level: Joi.string()
        }),
        updates: Joi.object({
            id: Joi.string(),
            username: Joi.string(),
            email: Joi.string(),
            level: Joi.string()
        })
    });
    return schema.validate(body);
}

const deleteUsersBodyValidation = body => {
    const schema = Joi.object({
        id: Joi.string(),
        username: Joi.string(),
        email: Joi.string(),
        level: Joi.string()
    });
    return schema.validate(body);
}

module.exports = {
    getUsersQueryValidation: validateQuery(getUsersQueryValidation),
    updateUsersBodyValidation: validateBody(updateUsersBodyValidation),
    deleteUsersBodyValidation: validateBody(deleteUsersBodyValidation)
}