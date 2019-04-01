//
// User Login Controller
//

const db = require("../../db/models");
const bcrypt = require("bcryptjs");
// const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../../config/config");
const validateLogin = require("./validation/login");

module.exports = {
  //
  // By default, if authentication fails, Passport will respond with a 401
  // Unauthorized status, and any additional route handlers will not be
  // invoked. If authentication succeeds, the next handler will be invoked
  // and the req.user property will be set to the authenticated user.
  // http://www.passportjs.org/docs/authenticate/
  //

  // authenticate: function(req, res, next) {
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/",
  //     // failureFlash: true
  //   })(req, res, next);  
  // },

  authenticate: function(req, res) {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.UserTable.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        // Verify the password
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };
              jwt.sign(
                payload,
                config.jwtkey, {
                  expiresIn: 3600
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              );
            } else {
              errors.password  = "Incorrect password";
              return res.status(400).json(errors);
            }
          })
          .catch(err => {
            errors.password  = "Incorrect password";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.password  = "Internal data error"
        res.status(500).json(errors.password);
      });
  },
}

