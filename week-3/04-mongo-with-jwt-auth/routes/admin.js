const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express();
const { Admin, Course } = require("../db");
const z = require("zod");
const jwt = require("jsonwebtoken");
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);
const { JWT_SECRET } = require("../db/index");

router.use(express.json());
// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const usernameResponse = emailSchema.safeParse(username);
  const passResponse = passwordSchema.safeParse(password);
  if (!usernameResponse.success || !passResponse.success) {
    res.status(403).send("invalid username or password");
  } else {
    Admin.create({
      username,
      password,
    });
    res.status(403).json("Admin created successfully");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await Admin.findOne({
    username,
    password
  });
  if (user) {
    const token = await jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "signup first",
    });
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const published = req.body.published;
  Course.create({
    title,
    description,
    price,
    imageLink,
    published,
  }).then((response) => {
    res.json({
      message: "Course created successfully",
      courseId: response._id,
    });
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find({}).then((response) => {
    res.json({ response });
  });
});
router.listen(3000);
module.exports = router;
