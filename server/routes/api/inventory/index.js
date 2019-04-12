//
// API Routes for inventory data
//

// Bring in expresss
const express = require("express");
const router = express.Router();

const inventory = require("../../../controllers/inventory");

//
// GET, POST at /api/inventory
//
router.route("/")
	// GET: /api/inventory
	// Return all rows from UserInventory 
	.get(inventory.findAll)

	// POST: /api/inventory 
	// TO-DO: 
	.post(inventory.create)
	;

//
// Preliminary/Tentative routes
// GET, PUT, DELETE at /api/inventory/:id
//
router.route("/:id")
	// GET: /api/inventory/:id
	// Return all rows from UserInventory for id
	.get(inventory.findByInvId)

	// PUT: /api/inventory/:id
	// Return all rows from UserInventory for id
	.put(inventory.updateByInvID)

	// DELETE: /api/inventory/:id
	// Remove an inventory entry for id
	.delete(inventory.deleteByInvID)
	;

//
// Export the router
//
module.exports = router;