const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  dispcription: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
