//
// Controller for inventory data API
//
// !!! NOT SECURE as of 2019-03-26 !!!
// --> CURRENTLY ALL CONTROLLERS ARE NOT USER SPECIFIC
//

// Load database models
const db = require("../../db/models");
const userInputs = require("./calc");

//
// UserInventory Controller
//
class UserInventoryController {
  //
  // Return all rows of UserInventory
  //
  findAll(req, res) {
    db.UserInventory.findAll(
      {
        where: {
          userId: req.query.userId
        }
      })
      .then(data => {
        // console.log(data);
        return res.json(data)
      })
      .catch(err => {
        console.log("err", err);
        return res.status(422).json(err)
      });
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
  // Math calculation required to push percentBottleRemaining, currentValueOfBottle, totalBottles, totalInventoryValue data in to UserInventories Table


  create(req, res) {
    // res.json(userInputs(req.body));
    userInputs(req, res);
    //   db.UserInventory.create(userInventory)
    //     .then(data => {
    //       console.log("POSTING TO MYSQL, USER DATA", "==================", data)
    //       return res.json(data)
    //     })
    //     .catch(err => res.status(422).json(err));
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

