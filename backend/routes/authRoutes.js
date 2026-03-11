const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { register, login } = require("../controllers/authController");

/* ---------------------------
   REGISTER
----------------------------*/

router.post("/register", register);

/* ---------------------------
   LOGIN
----------------------------*/

router.post("/login", login);


/* ---------------------------
   GOOGLE AUTH
----------------------------*/

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


/* ---------------------------
   GOOGLE CALLBACK
----------------------------*/

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {

    const user = req.user;

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.redirect("http://localhost:3000/dashboard");
  }
);


/* ---------------------------
   REFRESH TOKEN
----------------------------*/

router.post("/refresh", async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({
      message: "Access token refreshed"
    });

  } catch (error) {

    return res.status(403).json({
      message: "Invalid refresh token"
    });

  }
});


/* ---------------------------
   LOGOUT
----------------------------*/

router.post("/logout", (req, res) => {

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out successfully"
  });

});


module.exports = router;