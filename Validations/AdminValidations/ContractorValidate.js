const joi = require("joi");

const ContractorValidation = joi.object({
    Contractor_Name: joi.string().min(3).max(30).required(),
    Contractor_Number: joi.number().required(),
    Person_Name: joi.string().min(3).max(30).required(),
    Remark: joi.string().min(3).max(30).required(),
});

module.exports = ContractorValidation;