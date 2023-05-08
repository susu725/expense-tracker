const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

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
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填!' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符!' })
    }
    if (errors.length > 0) {
        res.render('register', { name, email, password, confirmPassword, errors })
    }
    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: '這個Email已經註冊過了!' })
            res.render('register', { name, email, password, confirmPassword, errors })
        } else {
            bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => {
                    User.create({ name, email, password: hash })
                })
                .then(res.redirect('/'))
                .catch(err => console.log(err))
        }
    })
        .catch(err => console.log(err))
})

// 登出
router.get('/logout', (req, res) => {
    // Passport.js提供的函式，可清除session
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router