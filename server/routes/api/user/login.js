//
// User Routes API for login
//

// Bring in express
const express = require("express");
const router = express.Router();

const user = require('../../../controllers/user/login');

// User Login Page
// GET: /api/user/login
router.get("/login", (req, res) => {
	// TO-DO: Add a real login page
	res.send("api/user/login");
});

// POST: User Login
router.post("/login", (req, res, next) => {
	user.authenticate(req, res, next);
	// res.send({"msg": "User login successful"});
});

// GET: User Logout
router.get("/logout", (req, res) => {
	req.logout();
	res.json({ "msg": "You are logged out now" });
});


module.exports = router;