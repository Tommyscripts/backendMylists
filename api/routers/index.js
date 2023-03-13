const router = require('express').Router()
const authRouter = require('./auth.router')
const productsRouter = require('./products.router')
const listRouter = require('./list.router')
const userRouter = require('./users.router.js')



router.use('/auth', authRouter)
router.use('/productos', productsRouter)
router.use('/list', listRouter)
router.use('/users', userRouter)

module.exports = router