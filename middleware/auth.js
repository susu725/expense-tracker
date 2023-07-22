module.exports = {
    authenticator: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        console.log('請先登入')
        res.redirect('/users/login')
    }
}