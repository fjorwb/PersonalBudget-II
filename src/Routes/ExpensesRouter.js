const ExpensesRouter = require('express').Router()

const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../Controllers/expensesController')

ExpensesRouter.route('/').post(createExpense)
ExpensesRouter.route('/').get(getExpenses)
ExpensesRouter.route('/:id').delete(deleteExpense)
ExpensesRouter.route('/:id').put(updateExpense)

module.exports = ExpensesRouter
