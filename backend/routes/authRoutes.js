const router = require("express").Router();
const passport = require("passport");

const { register, login } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected route" });
});

router.get("/admin", auth, role("admin"), (req, res) => {
  res.json("Admin only");
});

/* GOOGLE LOGIN */

router.get(
"/google",
passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
"/google/callback",
passport.authenticate("google", { failureRedirect: "/" }),
(req,res)=>{

res.redirect("http://localhost:3000/dashboard")

}
);

module.exports = router;