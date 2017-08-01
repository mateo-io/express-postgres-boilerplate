'use strict';

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hashedPass) => { user.password = hashedPass; });
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    },
    instanceMethods: {
      isValidPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  });
  return User;
};
