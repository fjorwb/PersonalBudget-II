const { db } = require('../model/dbconfig')

const setIncome = async (req, res) => {
  const { income } = req.body

  if (!income) {
    return res.status(400).send('income is required')
  } else if (income < 0) {
    return res.status(400).send('income must be a positive number')
  } else {
    const results = await db.any('SELECT * FROM balance')

    if (results.length === 0) {
      const statement = 'INSERT INTO balance (income) VALUES ($1)'
      const values = [income]

      await db.any(statement, values)

      return res.status(200).send(`income set to ${income}`)
    } else {
      const statement = 'UPDATE balance SET income = $1'
      const values = [income]

      await db.any(statement, values)

      return res.status(200).send(`income set to ${income}`)
    }
  }
}

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
  const totalIncome = await db.any('SELECT income FROM balance')
  const totalEnvelopes = await db.any('SELECT SUM(amount) FROM envelopes')
  const totalExpenses = await db.any('SELECT SUM(amount) FROM expenses')
  const savings = totalIncome[0].income - totalEnvelopes[0].sum

  res.status(200).send(`
  Total income   : ${totalIncome[0].income}
  Total budget   : ${totalEnvelopes[0].sum}
  --------------------------\n
  savings *      : ${savings}
  --------------------------

  Total expenses : ${totalExpenses[0].sum}
  Total balance  : ${totalEnvelopes[0].sum - totalExpenses[0].sum}\n
  ${savings < 0 ? '* funding required or adjust budget' : '* savings projected'}
  `)
}

module.exports = { setBudget, setIncome, getBalance }
