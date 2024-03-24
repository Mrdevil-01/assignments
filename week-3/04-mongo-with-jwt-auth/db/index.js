const mongoose = require("mongoose");
const JWT_SECRET = "rohit_123";

mongoose.connect(
  "mongodb+srv://rohitbarada:HelloMongoDB@admin.x6hrnus.mongodb.net/new-app-jwt"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
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
  ispublished: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
  JWT_SECRET
};
