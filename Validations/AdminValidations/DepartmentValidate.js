const joi = require("joi");

const DepartmentValidation = joi.object({
    Dep_Name: joi.string().min(3).max(30).required(),
    Remark: joi.string().min(3).max(30).required(),
});

module.exports = DepartmentValidation;