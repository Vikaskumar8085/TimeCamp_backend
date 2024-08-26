const joi = require("joi");

const ContactValidation = joi.object({
    Name: joi.string().min(3).max(30).required(),
    LastName: joi.string().min(3).max(30).required(),
    Email: joi.string().min(3).max(30).email().required(),
    dispcription: joi.string().min(3).max(40).required(),
});

module.exports = ContactValidation;