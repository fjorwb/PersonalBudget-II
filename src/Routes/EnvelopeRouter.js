const routerEnvelopes = require('express').Router()

const { createEnvelope, getEnvelopes, getEnvelopeByName, updateEnvelope, deleteEnvelope, transferMoney } = require('../Controllers/envelopeController')

routerEnvelopes.route('/').get(getEnvelopes)
routerEnvelopes.route('/:name').get(getEnvelopeByName)
routerEnvelopes.route('/').post(createEnvelope)
routerEnvelopes.route('/:name').put(updateEnvelope)
routerEnvelopes.route('/:name').delete(deleteEnvelope)
routerEnvelopes.route('/transfer').post(transferMoney)

module.exports = routerEnvelopes
