const Express = require("express");
const router = Express();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const z = require("zod");
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);
// User Routes
router.use(Express.json());
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
      username: req.headers.username,
    },
    {
      $push: { purchasedCourses: id },
    }
  ).then(() => {
    res.json({ msg: "Course purchased successfully" });
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  User.findOne({ username }).then((user) => {
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
