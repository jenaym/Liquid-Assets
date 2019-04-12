//
// API Routes for inventory data
//

// Bring in express
const express = require("express");
const router = express.Router();

const alcohol = require("../../../controllers/alcohol");

//
// GET, POST at /api/inventory
//
router.route("/")
    // GET: /api/inventory
    // Return all rows from UserInventory 
    .get(alcohol.findAll);

router.route("/brandStyle")
    .get(alcohol.findBrandStyle);


//
// Export the router
//
module.exports = router;
