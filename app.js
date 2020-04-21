const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const bodyparser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const errorFilePath = './api/Logs/error.Log';
const logHandler = require('./api/Logs/Logger');

logHandler.writeToFile('test.log', 'Felipe');


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req,res, next)=>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const errorMessage = new Error('The following URL was Not found with the following request: ' + 
        req.method + ' '+ fullUrl);

    errorMessage.status = 404;
    next(errorMessage);
});


app.use((errorMessage,req,res,next)=>{
    
    if(fs.exists(errorFilePath, err =>{
        console.log('This should be first');
        if(!err) writeFile(errorMessage,errorFilePath);
        else{
            appendToFile(errorMessage,errorFilePath);
        }
    }))

    res.status(errorMessage.status || 500);
    res.json({
        errorMessage:{
            message: errorMessage.message,
            err: errorMessage
        }
    })
});


function writeFile(data,path)
{
    let line = '*****************\n';
    let messageBlock = line;
    let date = new Date();
    messageBlock += (date + '\n');
    messageBlock += data + '\n';
    messageBlock += line + '\n';
    fs.writeFile(path, messageBlock + '\n', err=>{
        if(err){
            return console.log(err);
        }
    });
}
function appendToFile(data,path)
{
    let line = '*****************\n';
    let messageBlock = line;
    let date = new Date();
    messageBlock += (date + '\n');
    messageBlock += data + '\n';
    messageBlock += line + '\n';
    fs.appendFile(path, messageBlock, err=>{
        if(err){
            console.error('There was an error appending to the following file:' + 
            path + 
            ' This was the following error: ' + 
            err);
            return;
        }
    })
}
module.exports = app;