const sendErrorResponse = require('../util/errorResponse');
const Joi = require("joi");

const validateSchemaFields = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    console.log("D", req.body);
    if (error) {
        let message = "";
        error.details.forEach((err) => {
            message += `${err.context.key} : ${err.message},`;
        });
        sendErrorResponse(res, 400, { message });
        return;
      }
      next();
};

module.exports = { validateSchemaFields };