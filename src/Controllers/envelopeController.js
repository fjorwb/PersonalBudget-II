const { db } = require('../model/dbconfig')

const getEnvelopes = async (req, res) => {
  const results = await db.any('SELECT * FROM envelopes ORDER BY id ASC')
  if (results.length === 0) {
    res.status(404).send('No envelopes found')
  } else {
    res.status(200).send(results)
  }
}

const getEnvelopeByName = async (req, res) => {
  const { name } = req.params

  const statement = 'SELECT * FROM envelopes WHERE name = $1'
  const values = [name]

  const results = await db.any(statement, values)

  if (results.length === 0) {
    res.status(404).send('Envelope not found')
  } else {
    res.status(200).send(results)
  }
}

const createEnvelope = async (req, res) => {
  const { name, description, amount } = req.body

  const exists = await db.any('SELECT * FROM envelopes WHERE name = $1', [name])
  if (exists.length > 0) {
    res.status(400).send('Envelope already exists')
  } else {
    if (!name || !description || !amount) {
      res.status(400).send('Missing required fields')
    } else {
      let id = await db.any('SELECT MAX(id) FROM envelopes')
      const newId = id[0].max

      if (newId === null) {
        id = 1
      } else {
        id = newId + 1
      }

      const statement = 'INSERT INTO envelopes (id, name, description, amount) VALUES ($1, $2, $3, $4)'
      const values = [id, name, description, amount]

      const results = db.any(statement, values)
      if (!results) {
        res.status(500).send('Error creating envelope')
      } else {
        res.status(201).send(`Envelope "${name}" created with amount ${amount}`)
      }
    }
  }
}

const updateEnvelope = async (req, res) => {
  const { name } = req.params
  const { amount } = req.body

  const statement = 'UPDATE envelopes SET amount = $1 WHERE name = $2'
  const values = [amount, name]

  const results = await db.any(statement, values)
  if (!results) {
    res.status(404).send('Envelope not found')
  } else {
    res.status(200).send(`Envelope "${name}" updated with amount ${amount}`)
  }
}

const deleteEnvelope = async (req, res) => {
  const { name } = req.params

  const statement = 'DELETE FROM envelopes WHERE name = $1'
  const values = [name]

  const results = await db.any(statement, values)
  if (!results) {
    res.status(404).send('Envelope not found')
  } else {
    res.status(200).send(`Envelope "${name}" deleted`)
  }
}

const transferMoney = (req, res) => {
  const { from, to, amount } = req.query

  let statement = 'UPDATE envelopes SET amount = amount - $1 WHERE name = $2'
  let values = [amount, from]

  const results = db.any(statement, values)
  if (!results) {
    res.status(404).send('Envelope not found')
  } else {
    statement = 'UPDATE envelopes SET amount = amount + $1 WHERE name = $2'
    values = [amount, to]

    const results = db.any(statement, values)
    if (!results) {
      res.status(404).send('Envelope not found')
    } else {
      res.status(200).send(`transfered from:${from} to:${to} --> ${amount}`)
    }
  }
}

module.exports = { getEnvelopes, getEnvelopeByName, createEnvelope, updateEnvelope, deleteEnvelope, transferMoney }
