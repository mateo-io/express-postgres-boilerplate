const User = require('../models').User;

const jwt = require('jwt-simple');
const passport = require('passport');
const { compose } = require('compose-middleware');

const {
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME,
} = require('../config/config.js');


module.exports = {
  /*
  login:
  passport.authenticate('local', {session: false}),
  function(req, res) {
    console.log("im in login");
    res.send({message: 'hello'});
    //res.redirect('/users/' + req.user.username);
  },
  */

  login: compose([
    passport.authenticate('local'),
    (req, res) => {
      const token = jwt.encode({
        id: req.user.id,
        expirationDate: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
      }, JWT_TOKEN);

      res.status(200).send({ token });
    },
  ]),


  create(req, res) {
    const { name, email, password, isAdmin } = req.body;
    return User
      .create({
        name, email, password, isAdmin
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
};
