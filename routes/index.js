const express = require('express')
const { authenticator } = require('../middleware/auth')
const router = express.Router()

const records = require('./modules/records')
router.use('/records', authenticator, records)

const users = require('./modules/users')
router.use('/users', users)

const home = require('./modules/home')
router.use('/', authenticator, home)

module.exports = router