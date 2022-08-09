# Personal-Budget
The Personal Budget
A web application to manage your budget.

## Table of contents
- Description
- Project objectives
- Technology
- Launch
- Testing with wagger
- How to use
- Source

## Description
Context: This project satisfy all the requirements of the Portfolio - Personal Budget I of the Back-End Engineering path. This was built with node and express, using global.variables to store and retrieve data.

## Project Objectives
Build an API using Node.js and Express
Be able to create, read, update, and delete envelopes
Be able to create, read, update, delete and make transaction between envelopes.
Add functionality to CRUD expenses and produce a Balance.
Use Git version control to keep track of your work
Use Postman to test API endpoints
Document the project using JSDoc and Swagger.

## Technology
Project is created with:

- ES6 Javascript
- Node.js
- Express.js
- HTML
- CSS
- Postgresql
- Swagger

## Launch
Download the files and extract them in a folder. To run the server, node must be installed. Run 'npm install to install', then 'npm start'

Once it is installed run the app locally, API could be accessed at http://localhost:3000/

## Testing with Swagger
Swagger documentation and testing available at http://localhost:3000/api/docs

### Envelopes:
getAllEnvelopes: GET /env
createEnvelope: POST /env
UpdateEnvelope: PUT /env/:name (envelope name)
deleteEnvelope: DELETE /env/:name (envelope name)
Transfer an amount from a specific envelope to another one using POST /transfer?from=:id&to=:id&amount=:amount

### Expenses:
getAllExpenses: GET /exp
createExpense: POST /exp
UpdateExpense: PUT /exp/:id
deleteExpense: DELETE /exp/:id

### Balance:
setIncome: POST /budget/income
setBudget: POST /budget
getBalance: GET /budget

## How to use
Using Swagger at http://localhost:3000/api/docs you could try all the endpoints to perform CRUD operations.

## Source
This project was part of the portfolio challenge from the Codecademy's Back-End path.
