'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

const services = require('../services')

function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: `No tienes autorización`})
    }

    const token = req.headers.authorization
    
    console.log('token: '+token)
    // const payload = jwt.decode(token, config.SECRET_TOKEN)

    // if (payload.exp <= moment().unix()) {
    //     return res.status(401).send({ message: 'El token ha expirado' })
    // }

    // req.user = payload.sub
    // next()
    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
        
}

module.exports = isAuth
