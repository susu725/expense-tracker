const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
    // 初始化Passport模組
    app.use(passport.initialize())
    app.use(passport.session())

    // 設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email }).then(user => {
            if (!user) {
                console.log('用戶不存在')
                return done(null, false, { message: '用戶不存在' })
            }
            return bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    console.log('密碼錯誤')
                    return done(null, false, { message: '密碼錯誤' })
                }
                return done(null, user)
            })
        })
            .catch(err => done(err, null))
    }))

    // 設定序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}