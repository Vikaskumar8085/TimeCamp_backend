const AsyncHandler = require("express-async-handler");
const Department = require("../../Modals/DepartmentModal");
const NodeCache = require("node-cache");

const cache = new NodeCache();
// get all Department

const GetAllDepartment = AsyncHandler(async (req, res) => {
  try {
    let Dep;
    if (cache.has("Depart")) {
      Dep = cache.get("Depart");
    } else {
      Dep = await Department.find().lean().exec();
      cache.set("Depart", Dep);
    }

    res.status(200).json(Dep);
  } catch (error) {
    throw new Error(error.message);
  }
});

// get single department
const GetSingleDepartment = AsyncHandler(async (req, res) => {
  try {
    const getSingleItem = await Department.findById(req.params.id).lean();

    if (!getSingleItem) {
      res.status(200).json("not found any single item");
    }
    return res.status(200).json(getSingleItem);
  } catch (error) {
    throw new Error(error.message);
  }
});

// add Department

const AddDepartment = AsyncHandler(async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    cache.del("Dep");
    // Save the new department
    res.status(201).json(department); // Return the created department
  } catch (error) {
    throw new Error(error.message);
  }
});

// edit Department
const EditDepartment = AsyncHandler(async (req, res) => {
  try {
    const EditItems = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!EditItems) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(EditItems);
  } catch (error) {
    throw new Error(error.message);
  }
});
// remove Department
const RemoveDepartment = AsyncHandler(async (req, res) => {
  try {
    const RemoveItem = await Department.findByIdAndDelete(req.params.id);
    if (!RemoveItem) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  EditDepartment,
  GetSingleDepartment,
  GetAllDepartment,
  AddDepartment,
  RemoveDepartment,
};
