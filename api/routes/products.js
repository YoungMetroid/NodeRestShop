const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling Get request to /products'
    });

});

router.post('/', (req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling Post request to /products',
        createdProduct:product
    });
    
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if(id == 'special'){
        res.status(200).json({
            message: 'You discovered a special id'
        });
    }
    else{
        res.status(200).json({
            message: 'You passed the following id: ' + id
        });
    }
});

router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId
    res.status(200).json({
        message: 'Updated product with id ' + id
    });
});

router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId
    res.status(200).json({
        message: 'Deleted  product with id: ' + id
    });
});
module.exports = router;