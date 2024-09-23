const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;


// {
//   "postId": "postIdHere",  // Replace with actual post ID if needed
//   "message": "New comment on your post!"
// }
