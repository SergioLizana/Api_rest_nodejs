'use strict'

const express = require('express')
const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const auth = require('../middlewares/auth')

const api = express.Router()


api.get('/product', ProductController.getProducts)
api.get('/product/:productId' ,ProductController.getProduct)
api.post('/product', ProductController.saveProduct)
api.put('/product/:productId',ProductController.updateProduct)
api.delete('/product/:productId', ProductController.deleteProduct)
api.get('/private',auth, (req,res) => {
    res.status(200).send({message:'in'})
})
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)



module.exports = api