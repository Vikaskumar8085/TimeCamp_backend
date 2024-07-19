const AsyncHandler = require("express-async-handler");
const Company = require("../Modals/CompanySchema");

// GetAllCompany
const GetAllCompany = AsyncHandler(async (req, res) => {
  try {
    const response = await Company.find();
    if (response) {
      return res.status(200).json({
        message: response,
      });
    }
  } catch (error) {
    return res.status(500).json(error?.message);
  }
});

// RegisterCompany

const RegisterCompany = AsyncHandler(async (req, res) => {
  try {
    const response = await Company(req.body);
    if (response) {
      await response.save();
      return res.status(200).json({
        message: response,
      });
    }
  } catch (error) {
    return res.status(500).json(error?.message);
  }
});

const EditCompany = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
  } catch (error) {}
});

module.exports = {
  GetAllCompany,
  EditCompany,
  RegisterCompany,
};
