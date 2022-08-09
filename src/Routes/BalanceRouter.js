const balanceRouter = require('express').Router()

const { setBudget, getBalance } = require('../Controllers/balanceController')

balanceRouter.route('/').post(setBudget)
balanceRouter.route('/').get(getBalance)

module.exports = balanceRouter
