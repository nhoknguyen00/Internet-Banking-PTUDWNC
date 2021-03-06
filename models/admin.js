'use strict'
import {sequelize, Sequelize} from '../src/db'
import {crypt} from '../src/utils'

const Admins = sequelize.define('admins', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {})

//hash password before being created on database
Admins.beforeCreate((adminInstance, optionsObject) => {
  adminInstance.password = crypt.hashPassword(adminInstance.password)
})

Admins.prototype.validPassword = function (password) {
  return crypt.comparePassword(password, this.password)
}

export default Admins
