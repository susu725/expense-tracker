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
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填！' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: '這個 Email 已經被註冊過了！' })
            return res.render('register', { errors, name, email, password, confirmPassword })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({ name, email, password: hash }))
            .then(() => res.redirect('/'))
    })
        .catch(err => console.log(err))
})

// 登出
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '您已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router