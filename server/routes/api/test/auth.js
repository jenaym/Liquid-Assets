//
// Test authentication and protected route
//
const passport = require("passport");

module.exports = function(app) {
  app.get(
    "/testauth",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json(req.user);
      // res.json({ msg: "Reaching here" });
    }
  );  
}
