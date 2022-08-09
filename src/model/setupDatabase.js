require('dotenv').config()

const { DB } = require('../../config')

const { Client } = require('pg')

const database = async () => {
  // const createDatabase = 'CREATE DATABASE IF NOT EXISTS personalbudget'

  const envelopesTableStatement = `
    CREATE TABLE IF NOT EXISTS envelopes(
      id          INT,
      name        VARCHAR(30),
      description VARCHAR(90),
      amount      NUMERIC(12,2)
)`

  const expensesTableStatement = `
    CREATE TABLE IF NOT EXISTS expenses(
      id          INT,
      name        VARCHAR(30),
      detail      VARCHAR(90),
      amount      NUMERIC(12,2),
      date        BIGINT
)`

  const budgetTableStatement = `
    CREATE TABLE IF NOT EXISTS balance(
      id          INT,
      budget      NUMERIC(12,2)
)`

  try {
    const client = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PORT
    })

    await client.connect()

    // await client.query(createDatabase)
    await client.query(envelopesTableStatement)
    await client.query(expensesTableStatement)
    await client.query(budgetTableStatement)
    await client.end()
  } catch (error) {
    console.log('Error creating one or more tables: ', error)
  }
}

database()
