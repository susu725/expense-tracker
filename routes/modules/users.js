const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// 登入
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

// 註冊
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        console.log('確認密碼不符')
        return res.render('register', { name, email, password, confirmPassword })
    }
    return User.findOne({ email }).then(user => {
        if (user) {
            console.log("用戶已存在")
            return res.render('register', { name, email, password, confirmPassword })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({ name, email, password: hash }))
            .then(() => res.redirect('/'))
    })
        .catch(err => console.log(err))
})

module.exports = router