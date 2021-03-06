'use strict'
import {sequelize, Sequelize} from '../src/db'
import {crypt} from '../src/utils'

const Employees = sequelize.define('employees', {
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
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
Employees.beforeCreate((employeeInstance, optionsObject) => {
  employeeInstance.password = crypt.hashPassword(employeeInstance.password)
})

Employees.prototype.validPassword = function (password) {
  return crypt.comparePassword(password, this.password)
}

export default Employees
