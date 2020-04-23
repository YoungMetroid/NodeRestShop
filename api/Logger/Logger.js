
const fs = require('fs');

     const writeToFile = (filePath,text)=>{
        let writeStream = fs.createWriteStream(filePath,{ 'flags': 'a', 'encoding': null, 'mode': '0666'});
        writeStream.write(text,'UTF8');
        writeStream.end();

        writeStream.on('finish', ()=>{
            console.log('Write Completed');
        })
        
        writeStream.on('error', error=>{
            console.log(error.stack);
        });
    }


exports.writeToFile = writeToFile;

