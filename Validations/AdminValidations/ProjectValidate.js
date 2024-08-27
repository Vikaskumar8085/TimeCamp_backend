const joi = require("joi");

const ProjectValidation = joi.object({
    Project_Name: joi.string().min(3).max(30).required(),
    Project_Code: joi.string().min(3).max(30).required(),
    Client_Name: joi.string().min(3).max(30).required(),
    Start_Date: joi.date().required(),
    End_Date: joi.date().required(),
    Project_Type: joi.string().min(3).max(30).required(),
    Project_Managers: joi.string().min(3).max(30).required(),
    Role: joi.string().min(3).max(30).required(),
    Employee: joi.string().min(3).max(30).required(),

});


module.exports = ProjectValidation;