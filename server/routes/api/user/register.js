//
// Users Routes API for registration
//

// Bring in express
const express = require("express");
const router = express.Router();

const user = require("../../../controllers/user/register");

// User Register Page Route
router.get("/", (req, res) => {
	// TO-DO: Add a real page
	res.send("api/user/register");
});

// User Register Form Post Route
router.post("/", (req, res, next) => {
	user.register(req, res, next);
});


module.exports = router;
