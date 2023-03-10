const router = require('express').Router()
const authRouter = require('./auth.router')
//const productosRouter = require('./productos.router')
// const listRouter = require('./list.router')
const userRouter = require('./users.router.js')



router.use('/auth', authRouter)
// router.use('/productos', productosRouter)
// router.use('/list', listRouter)
router.use('/users', userRouter)

module.exports = router