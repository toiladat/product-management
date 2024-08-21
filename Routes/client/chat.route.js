const express = require('express');
const route = express.Router()
const controller = require('../../controllers/client/chat.controller.js');
const chatMiddewares = require('../../middewares/client/chat.middewares');
route.get('/:roomChatId',
  chatMiddewares.isAccess,
  controller.index
  )

module.exports = route