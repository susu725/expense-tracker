const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        console.log('確認密碼不符')
    } else {
        User.findOne({ email }).then(user => {
            if (user) {
                res.render('register', { name, email, password, confirmPassword })
                console.log("用戶已存在")
            }
            return User.create({ name, email, password })
        })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    }
})

module.exports = router