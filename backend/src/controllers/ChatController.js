const Chat = require('../models/Chat')

module.exports = {
    async index(req, res) {
        const chats = await Chat.find({}).sort('-createdAt');
        return res.json(chats);
      },
    
      async store(req, res) {
        const chat = await Chat.create(req.body);
        req.io.emit("chat", chat);
        return res.json(chat);
    }
}