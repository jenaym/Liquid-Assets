//
// Controller for user registration
//

// Load database models
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const db = require("../../db/models");
const validateRegister = require("./validation/register");

module.exports = {
  register: function (req, res, next) {
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check if the email address is already registered
    db.UserTable.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user) {
          errors.email = "A user with the same email address already exists";
          res.json(errors);
        } else {
          const avatarUrl = gravatar.url(req.body.email, {
            size: '200',
            rating: 'pg',
            default: 'mp'
          });

          const newUser = {
            name: req.body.name,
            email: req.body.email,
            avatar: avatarUrl,
            password: req.body.password
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              newUser.password = hash;
              db.UserTable.create(newUser)
                .then(user => {
                  // auto-login
                  req.login(user, err => {
                    return next(err);
                  });
                  res.json({
                    msg: "user registered successfully"
                  });
                })
                .catch(error => {
                  res.json({
                    error: "Unable to register the user: " + error
                  });
                  return;
                });
            });
          });
        }
      });
  }
}