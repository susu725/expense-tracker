const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const users = require('./modules/users')
const home = require('./modules/home')

const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router