
const fs = require('fs');
class Logger{

    constructor(){
        this.asterick = '******************************************************\n\n';
    }
    createMessage(message){
        let messageTemp = message;
        message = this.asterick;
        message += new Date() + '\n';
        message += messageTemp + '\n\n';
        message += this.asterick;
        return message;
    }
    streamToFile(filePath,text){
        text = this.createMessage(text);
        let writeStream = fs.createWriteStream(filePath,{ 'flags': 'a', 'encoding': null, 'mode': '0666'});
        writeStream.write(text,'UTF8');
        writeStream.end();

        writeStream.on('finish', ()=>{
            console.log('Write to Log Completed');
        })
        
        writeStream.on('error', error=>{
            console.log(error.stack);
        });
    } 
    //This function it not neccesary but just a reference for another way
    //to write to a file
    /*
    writeFile(data,path)
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
    //This function it not neccesary but just a reference for another way
    //to write to a file
    appendToFile(data,path)
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
    */
}
exports.Logger = Logger;

