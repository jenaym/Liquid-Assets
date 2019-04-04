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
class AlcoholListController {
    //
    // Return Alcohol Table Info
    //
    findAll(req, res) {
        db.Alcohol
            .findAll({ attributes: ['brandstyle', 'sizeML', 'image', 'tastingNotes'] })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
}

module.exports = new AlcoholListController();
