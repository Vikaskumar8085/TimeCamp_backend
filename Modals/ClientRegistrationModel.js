const mongoose = require("mongoose");

const ClientRegistrationSchema = mongoose.Schema(
  {
    Company_Name: {
      type: String,
      required: true,
    },
    Client_Name: {
      type: String,
      required: true,
    },
    Client_Email: {
      type: String,
      required: true,
    },
    Client_Phone: {
      type: String,
      required: true,
    },
    Client_POstal_Code: {
      type: Number,
      required: true,
    },

    Tax_Number: {
      type: String,
      required: true,
    },
    Is_Active: {
      type: String,
      required: true,
    },
    Common_Id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", ClientRegistrationSchema);
module.exports = Client;
