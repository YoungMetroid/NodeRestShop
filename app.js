const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const bodyparser = require('body-parser');
const mongoose= require('mongoose');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const errorFile = './api/Logger/error.Log';
const errorFilePath = './api/Logger/';
const logs =  new require('./api/Logger/Logger');

//logHandler = new logs.Logger();
//logHandler.createMessage('CreateTest');
console.log(process.env.MONGO_ATLAS_PW);
mongoose.connect(
    "mongodb+srv://youngmetroid:"+ 
    process.env.MONGO_ATLAS_PW+
    "@node-rest-shop-ubhfg.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if(req.method ==='OPTIONS'){
            res.header('Access-Control-Allow-Methods', 
            'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
   next();
});


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
    
    if(fs.exists(errorFilePath, (err) =>{
        if(err) {   
            logHandler.streamToFile(errorFile,errorMessage);
        }
        else{
           console.log('The path: ' + errorFilePath + 'does not exist');
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