const logHandler = require('./Logger');

log = new logHandler.Logger();
let text = log.createMessage("tst");
console.log(text);
