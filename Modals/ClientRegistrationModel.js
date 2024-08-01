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
    Client_Address: {
      type: String,
      required: true,
    },
    Client_Postal_Code: {
      type: Number,
      required: true,
    },

    GstNumber: {
      type: String,
      required: true,
    },
    Is_Active: {
      type: String,
      required: true,
      default: false,
    },
    Common_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", ClientRegistrationSchema);
module.exports = Client;
