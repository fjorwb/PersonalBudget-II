const balanceRouter = require('express').Router()

const { setBudget, setIncome, getBalance } = require('../Controllers/balanceController')

balanceRouter.route('/income').post(setIncome)
balanceRouter.route('/').post(setBudget)
balanceRouter.route('/').get(getBalance)

module.exports = balanceRouter
