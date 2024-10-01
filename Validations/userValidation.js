const Joi = require("joi");

// registererValidation

const registerValidation = Joi.object({
  FirstName: Joi.string().min(3).max(30).required(),
  LastName: Joi.string().alphanum().min(3).max(30),
  Email: Joi.string().min(4).max(30).required(),
  Password: Joi.string()
    .min(4)
    .max(40)
    .pattern(
      new RegExp(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ),
  Photo: Joi.string().min(3).max(70),
  Term: Joi.boolean().required(),
  user_id: Joi.number(),
  // user_id: Joi.string().required(),
});

// login Validation
const loginValidation = Joi.object({
  Email: Joi.string().min(4).max(100).required(),
  Password: Joi.string().pattern(
    new RegExp(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ),
});

// get User Validation

module.exports = {
  registerValidation,
  loginValidation,
};
