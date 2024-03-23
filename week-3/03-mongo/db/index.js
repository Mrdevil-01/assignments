const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohitbarada:HelloMongoDB@admin.x6hrnus.mongodb.net/new-app"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Referring to the Course model
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
