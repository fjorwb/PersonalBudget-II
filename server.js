require('dotenv').config()
require('express-async-errors')

const express = require('express')

const cors = require('cors')

const app = express()

// global.totalBudget = 0

// global.envelopes = [
//   { name: 'grocery', amount: 1000 },
//   { name: 'gas', amount: 400 },
//   { name: 'transportation', amount: 200 }
// ]

// global.expenses = [
//   { op: 0, name: 'grocery', amount: 100 },
//   { op: 1, name: 'gas', amount: 50 },
//   { op: 2, name: 'transportation', amount: 20 }
// ]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerEnvelopes = require('./src/Routes/EnvelopeRouter')
const routerBalance = require('./src/Routes/BalanceRouter')
const routerExpenses = require('./src/Routes/ExpensesRouter')
const routerDocs = require('./src/Routes/DocsRouter')

app.use(cors())

app.use('/env', routerEnvelopes)
app.use('/budget', routerBalance)
app.use('/expenses', routerExpenses)
app.use('/docs', routerDocs)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
})
