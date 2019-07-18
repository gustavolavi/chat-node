const express = require('express')
const ChatController = require('../controllers/ChatController')

const routes = express.Router()

routes.get("/chats", ChatController.index)
routes.post("/chats", ChatController.store)

module.exports = routes