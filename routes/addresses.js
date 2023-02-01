const express = require('express');
const Address = require('../database/models/Address');
const router = express.Router();
const User = require('../database/models/User');


// INDEX /api/users
router.get('/', (req, res) => {
    Address.findAll({
        include: {
            model: User,
            as: "residente",
            attributes: ['name', 'age']
        },
    }).then(addresses => {
        res.json(addresses)
    })
})

// CREATE /api/users
router.post('/', (req, res) => {
    Address.create({
        id: req.body.id,
        street: req.body.street,
        residente_id: req.body.residente_id
    }).then(address => {
        res.json(address)
    }).catch(error => {
        res.json({
            mensaje: 'Ha ocurrido un error',
            error: error.erros[0].message
        })
    })
})


module.exports = router;