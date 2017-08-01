const User = require('../models').User;

const jwt = require('jwt-simple');
const passport = require('passport');
const { compose } = require('compose-middleware');

const TOKEN_EXPIRATION_TIME = 100000;
const JWT_TOKEN = 'secret';


module.exports = {
  login:
  passport.authenticate('local', {session: false}),
  function(req, res) {
    req.user.name = "Giuan";
    res.send(req.user.name);
    //res.redirect('/users/' + req.user.username);
  },
  /*
  login: compose([
    passport.authenticate('local'),
    (req, res) => {
      const token = jwt.encode({
        id: req.user.id,
        expirationDate: new Date(Date.now() + TOKENEXPIRATIONTIME),
      }, JWTTOKEN);

      res.status(200).send({ token });
    },
  ]),  */


  create(req, res) {
    const { name, email, password } = req.body;
    return User
      .create({
        name, email, password
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
