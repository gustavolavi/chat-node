const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://mongo:27017/chat', { useNewUrlParser: true }).
  catch(error => handleError(error));