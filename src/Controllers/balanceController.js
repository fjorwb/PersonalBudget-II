const { db } = require('../model/dbconfig')

const setBudget = async (req, res) => {
  const { budget } = req.body

  if (!budget) {
    return res.status(400).send('Budget is required')
  } else if (budget < 0) {
    return res.status(400).send('Budget must be a positive number')
  } else {
    const results = await db.any('SELECT * FROM balance')

    if (results.length === 0) {
      const statement = 'INSERT INTO balance (budget) VALUES ($1)'
      const values = [budget]

      await db.any(statement, values)

      return res.status(200).send(`Budget set to ${budget}`)
    } else {
      const statement = 'UPDATE balance SET budget = $1'
      const values = [budget]

      await db.any(statement, values)

      return res.status(200).send(`Budget set to ${budget}`)
    }
  }
}

const getBalance = async (req, res) => {
  const totalEnvelopes = await db.any('SELECT SUM(amount) FROM envelopes')
  const totalExpenses = await db.any('SELECT SUM(amount) FROM expenses')

  res.status(200).send(`Total budget: ${totalEnvelopes[0].sum}
  \nTotal expenses: ${totalExpenses[0].sum}
  \nTotal balance: ${totalEnvelopes[0].sum - totalExpenses[0].sum}`)
}

module.exports = { setBudget, getBalance }
