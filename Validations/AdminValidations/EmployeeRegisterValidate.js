const joi = require("joi");

const EmployeeRegisterValidation = joi.object({
    Employee_FirstName: joi.string().min(3).max(30).required(),
    Employee_LastName: joi.string().min(3).max(30).required(),
    Employee_Email: joi.string().min(3).max(30).email().required(),
    Employee_Phone: joi.string().min(3).max(30).required(),
    Employee_JoiningDate: joi.date().required(),
    Employee_Designation: joi.string().min(3).max(30).required(),
    Employee_Address: joi.string().min(3).max(30).required(),
    Role: joi.string().min(3).max(30).required(),
});

module.exports = EmployeeRegisterValidation;