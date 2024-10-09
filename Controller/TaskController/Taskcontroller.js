const asyncHandler = require("express-async-handler");
const {StatusCodes} = require("http-status-codes");
const XLSX = require("xlsx");
const fs = require("fs");
const csv = require("csv-parser");

const taskcontroller = {
  taskuploadctr: asyncHandler(async (req, res) => {
    try {
      const results = [];

      const workbook = XLSX.readFile(req.file.path); // Replace with your Excel file name
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log(jsonData, "req.file task upload");

      // fs.createReadStream(req.file.path)
      //   .pipe(csv())
      //   .on("data", (data) => results.push(data))
      //   .on("end", () => {
      //     console.log(results);
      //     // [
      //     //   { NAME: 'Daffy Duck', AGE: '24' },
      //     //   { NAME: 'Bugs Bunny', AGE: '22' }
      //     // ]
      //   });

      return res
        .status(StatusCodes.OK)
        .json({success: true, message: "fule uploaded"});
    } catch (error) {
      throw new Error(error?.message);
    }
  }),

  createtaskctr: asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
    } catch (error) {
      throw new Error(error?.message);
    }
  }),
};

module.exports = taskcontroller;
