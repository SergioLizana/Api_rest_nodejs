'use strict'

const Product = require('../modelos/product')

function getProduct(req,res){
    let productId = req.params.productId
    Product.findById(productId,(err,product) =>{
        if(err) return res.status(500).send({message:`Error al realizar la operación ${err}`})
        if(!product) res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product})
    })
}

function getProducts(req,res){
    Product.find({},(err,products) =>{
        if(err) return res.status(500).send({message:`Error al realizar la operación ${err}`})
        if(!products) return res.status(404).send({message: `No existen productos`})
        res.status(200).send({products})
    })
}

function saveProduct(req,resp){
    console.log('POST api/product')
    console.log(req.body)


    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description  = req.body.description
    
    product.save((err,productStored) => {
        if (err) {
            res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        }else{
             res.status(200).send({product: productStored})
        }
      
    })
}

function updateProduct(req,res){
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId,update ,(err,productUpdated) => {
        if(err) return res.status(500).send({message:`Error al realizar la operación ${err}`})

        res.status(200).send({product: productUpdated})
    })
}

function deleteProduct(req,res){

    let productId = req.params.productId
    console.log(productId)
    Product.findById(productId,(err,product) =>{
        if(err) return res.status(500).send({message:`Error al realizar la operación ${err}`})
        product.remove(err => {
            if(err) return res.status(500).send({message:`Error borrar el producto ${err}`})
            res.status(200).send({message: 'La operación se ha realizado con exito'})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}