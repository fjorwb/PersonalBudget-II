const { db } = require('../model/dbconfig')

const getExpenses = async (req, res) => {
  const statement = 'SELECT * FROM expenses ORDER BY id ASC'
  const results = await db.any(statement)
  if (!results) {
    res.status(404).send('No expenses found')
  } else {
    res.status(200).json(results)
  }
}

const createExpense = async (req, res) => {
  const { name, detail, amount } = req.body

  let id = await db.any('SELECT MAX(id) FROM expenses')
  const newId = id[0].max

  if (newId === null) {
    id = 1
  } else {
    id = newId + 1
  }

  const date = Date.now()

  if (!name || !amount || !detail) {
    return res.status(400).send('Name, detail and amount are required')
  } else if (amount < 0) {
    return res.status(400).send('Amount must be a positive number')
  } else {
    const statement = 'INSERT INTO expenses (id, name, detail, amount, date) VALUES ($1, $2, $3, $4, $5)'
    const values = [id, name, detail, amount, date]

    const results = db.any(statement, values)
    if (!results) {
      res.status(500).send('Error creating expense')
    } else {
      res.status(200).send(`Expense created: ${name} - ${amount}`)
    }
  }
}

const updateExpense = async (req, res) => {
  const { id } = req.params
  const { detail, amount } = req.body

  if (!amount || !detail) {
    return res.status(400).send('Amount and detail are required')
  } else if (amount < 0) {
    return res.status(400).send('Amount must be a positive number')
  } else {
    const statement = 'UPDATE expenses SET detail = $1, amount = $2 WHERE id = $3'
    const values = [detail, amount, id]

    const results = await db.any(statement, values)

    if (!results) {
      res.status(404).send('Expense not found')
    } else {
      res.status(200).send(`expense updated: detail: ${detail} / amount: ${amount}`)
    }
  }
}

const deleteExpense = async (req, res) => {
  const { id } = req.params

  const statement = 'DELETE FROM expenses WHERE id = $1'
  const values = [id]

  const results = await db.any(statement, values)

  if (!results) {
    res.status(404).send('Expense not found')
  } else {
    res.status(200).send(`Expense deleted: ${id}`)
  }
}

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense }
