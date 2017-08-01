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
    name: { type: DataTypes.STRING, allowNull: false, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    isAdmin: { type: DataTypes.STRING, allowNull: false, unique: true, default: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  });

  User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
  }

  return User;
};



    /*
    instanceMethods: {
      validPassword: function(password) {
        console.log('valid password called');
        return bcrypt.compareSync(password, this.password);
      },
      isValidPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
    */
