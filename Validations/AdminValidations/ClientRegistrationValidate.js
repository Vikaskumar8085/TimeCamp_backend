const joi = require("joi");

const ClientRegistrationValidation = joi.object({
    Company_Name: joi.string().min(3).max(30).required(),
    Client_Name: joi.string().min(3).max(30).required(),
    Client_Email: joi.string().min(3).max(30).email().required(),
    Client_Phone: joi.string().min(3).max(30).required(),
    Client_Address: joi.string().min(3).max(40).required(),
    Client_Postal_Code: joi.number().required(),
    GstNumber: joi.string().min(3).max(30).required(),

    });

module.exports = ClientRegistrationValidation;