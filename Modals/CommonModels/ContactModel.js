const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ContactSchema = mongoose.Schema({
  Contact_Id: {
    type: Number,
    trim: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Dispcription: {
    type: String,
  },
});

ContactSchema.plugin(AutoIncrement, {
  inc_field: "Contact_Id",
  start_seq: 1,
});
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
