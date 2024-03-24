const express = require("express");
const router = express();
const { User, Course, JWT_SECRET } = require("../db");
const userMiddleware = require("../middleware/user");
const z = require("zod");
const jwt = require("jsonwebtoken");

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

router.use(express.json());
// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const usernameResponse = emailSchema.safeParse(username);
  const passResponse = passwordSchema.safeParse(password);
  if (!usernameResponse.success || !passResponse.success) {
    res.status(403).send("invalid username or password");
  } else {
    User.create({
      username,
      password,
    });
    res.status(201).json("User created successfully");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "signup first",
    });
  }
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({}).then((response) => {
    res.json({ response });
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const id = req.params.courseId;

  User.updateOne(
    {
      username: req.username,
    },
    {
      $push: { purchasedCourses: id },
    }
  ).then(() => {
    res.json({ msg: "Course purchased successfully" });
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  User.findOne({ username : req.username}).then((user) => {
    Course.find({
      _id: { $in: user.purchasedCourses },
    }).then((courses) => {
      res.json({
        courses,
      });
    });
  });
});
router.listen(3000);
module.exports = router;
