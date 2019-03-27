//
// Controller for inventory data API
//
// !!! NOT SECURE as of 2019-03-26 !!!
// --> CURRENTLY ALL CONTROLLERS ARE NOT USER SPECIFIC
//

// Load database models
const db = require("../../db/models");

//
// UserInventory Controller
//
class UserInventoryController {
  //
  // Return all rows of UserInventory
  //
  findAll(req, res) {
    db.UserInventory.findAll(req.query)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }

  //
  // Find by UserInventory ID
  //
  findByInvId(req, res) {
    db.UserInventory.findByPk(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }

  //
  // Insert a new model data 
  //
  create(req, res) {
    db.UserInventory.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }

  //
  // Update the specified UserInventory ID
  //
  updateByInvID(req, res) {
    const options = {
      where: {
        id: req.params.id
      }
    };
  
    db.UserInventory.update(req.body, options)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }

  //
  // Delete the specified UserInventory ID
  //
  deleteByInvID(req, res) {
    const options = {
      where: {
        id: req.params.id
      }
    };

    db.UserInventory.destroy(options)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
}

module.exports = new UserInventoryController();
