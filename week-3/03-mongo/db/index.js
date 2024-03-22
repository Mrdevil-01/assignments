const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rohitbarada:HelloMongoDB@admin.x6hrnus.mongodb.net/")

// Connect to MongoDB

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    email: String,
    password: String,
    
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}