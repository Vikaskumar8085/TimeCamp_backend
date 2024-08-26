const joi = require("joi");

const DesignationValidation = joi.object({
    Desig_Name: joi.string().min(3).max(30).required(),
    });

module.exports = DesignationValidation;