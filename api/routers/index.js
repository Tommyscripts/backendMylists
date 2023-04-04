const router = require('express').Router()
const authRouter = require('./auth.router.js')
const productsRouter = require('./products.router.js')
const listRouter = require('./lists.router.js')
const userRouter = require('./users.router.js')



router.use('/auth', authRouter)
router.use('/productos', productsRouter)
router.use('/list', listRouter)
router.use('/users', userRouter)

module.exports = router