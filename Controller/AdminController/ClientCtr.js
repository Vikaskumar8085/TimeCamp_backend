const asyncHandler = require("express-async-handler");
const User = require("../../Modals/userSchema");
const Client = require("../../Modals/ClientRegistrationModel");
const {StatusCodes} = require("http-status-codes");
const Company = require("../../Modals/CompanySchema");
const Project = require("../../Modals/ProjectSchema");
const clientController = {
  //  create client
  createClient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const company = await Company.findOne({UserId: user?.user_id});
      if (!company) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const addItem = await Client({
        Company_Name: req.body.Company_Name,
        Client_Name: req.body.Client_Name,
        Client_Email: req.body.Client_Email,
        Client_Phone: req.body.Client_Phone,
        Client_Postal_Code: req.body.Client_Postal_Code,
        Client_Address: req.body.Client_Address,
        GstNumber: req.body.GstNumber,
        Common_Id: company?.Company_Id,
      });
      if (addItem) {
        await addItem.save();
        return res
          .status(200)
          .json({success: true, message: "successfully client added"});
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // fetch clients
  fetchallclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }

      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const clientlist = await Client.find({
        Common_Id: checkcompany?.Company_Id,
      });

      return res.status(200).json({
        message: "fetch data successfully",
        success: true,
        clientdata: clientlist,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // remove clients
  removeclient: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // edit clients
  editclients: asyncHandler(async (req, res) => {
    try {
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get single clients
  singleclients: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("un authorized user please sing up");
      }
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      // check companys
      const getsingleclient = await Client.findOne({Client_Id: 1});
      if (!getsingleclient) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Clinet not found");
      }
      return res.status(StatusCodes.OK).json({
        result: getsingleclient,
        message: "fetch successfully clients ",
        success: true,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  //get active client
  getactiveClient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      const clientlist = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "Active",
      }).lean();

      return res.status(200).json({
        success: true,
        message: "successfully fetch active client",
        result: clientlist,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get inactive client
  getinactiveclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const result = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "InActive",
      });

      return res.status(200).json({
        success: true,
        message: " successfully fetch Inactive client",
        result: result,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
  // get dead clients
  getdeadclient: asyncHandler(async (req, res) => {
    try {
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }

      const result = await Client.find({
        Common_Id: checkcompany?.Company_Id,
        Client_Status: "Dead",
      });

      return res.status(200).json({
        success: true,
        message: "successfully fetch dead client",
        result: result,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get clients projects

  fetchclientsprojects: asyncHandler(async (req, res) => {
    try {
      // check user
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      // check client
      const checkclient = await Client.find({
        Common_Id: checkcompany?.Company_Id,
      });
      if (!checkclient) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("client not exists");
      }
      // projects
      const fetchallclientprojects = await Project.find({
        "client.clientId": checkclient?.Client_Id,
      })
        .lean()
        .exec();
      if (!fetchallclientprojects) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(error?.message);
      }
      return res
        .status(StatusCodes.OK)
        .json({success: true, result: fetchallclientprojects});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  // get client projects

  fetchclientprojects: asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
      // user
      const user = await User?.findById(req.user);
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Unautorized User Please Singup");
      }
      // check company
      const checkcompany = await Company.findOne({UserId: user?.user_id});
      if (!checkcompany) {
        res.status(StatusCodes?.BAD_REQUEST);
        throw new Error("company not exists please create first company");
      }
      // check company

      const clientprojects = await Project.find({
        "client.clientId": id,
      });
      if (!clientprojects) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Client Not Found");
      }
      return res.status(StatusCodes.OK).json({
        result: clientprojects,
        message: "client projects",
        success: true,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = clientController;
