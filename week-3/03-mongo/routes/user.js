const Express = require("express");
const router = Express();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',(req, res) => {
    // Implement user signup logic
    const email = req.body.email;
  const password = req.body.password;
  const emailResponse = emailSchema.safeParse(email);
  const passResponse = passwordSchema.safeParse(password);
  if (!emailResponse.success || !passResponse.success) {
    res.status(403).send("invalid email or password");
  } else {
    User.create({
      email,
      password,
    });
    res.status(403).json("User created successfully");
  }
});

router.get('/courses',(req, res) => {
    // Implement listing all courses logic

    Course.find({}).then((response)=>{
        res.json({response})
      })
    
    });

router.post('/courses/:courseId',userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});
router.listen(3000)
module.exports = router