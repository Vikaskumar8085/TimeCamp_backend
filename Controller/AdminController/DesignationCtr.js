const AsyncHandler = require("express-async-handler");
const Designation = require("../../Modals/DesignationModal");

// @GET ALL DESIGNATION

const GetAllDesignation = AsyncHandler(async (req, res) => {
  try {
    const GetAllItems = await Designation.find().lean().exec();
    res.status(200).json(GetAllItems);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @GET SINGLE DESIGNATION

const GetSignleDesignation = AsyncHandler(async (req, res) => {
  try {
    const getSingleItem = await Designation.findById(req.params.id).lean();

    if (!getSingleItem) {
      res.status(200).json("not found any single item");
    }
    return res.status(200).json(getSingleItem);
  } catch (error) {
    throw new Error(error.message);
  }
});

// add designation

const AddDesignation = AsyncHandler(async (req, res) => {
  try {
    const designation = new Designation(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Edit Designation
const RemoveDesignation = AsyncHandler(async (req, res) => {
  try {
    const RemoveItem = await Designation.findByIdAndDelete(req.params.id);
    if (!RemoveItem) {
      return res.status(404).json({ error: "Designation not found" });
    }
    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
});

const EditDesignation = AsyncHandler(async (req, res) => {
  try {
    const EditItems = await Designation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!EditItems) {
      return res.status(404).json({ error: "Designation not found" });
    }
    res.status(200).json(EditItems);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  GetAllDesignation,
  RemoveDesignation,
  EditDesignation,
  AddDesignation,
  GetSignleDesignation,
};
