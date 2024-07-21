const express = require('express');
const multer = require('multer');
const route = express.Router();
const controller = require('../../controllers/admin/account.controller');
const uploadToCloud = require('../../middewares/admin/uploadToCloud.middewares');

const upload = multer()
route.get(`/`, controller.index);
route.get(`/create`, controller.create)
route.post(`/create`,
  upload.single('avatar'),
  uploadToCloud.uploadSingle,
  controller.createPost
)
route.get('/edit/:id', controller.edit)
route.patch(`/edit/:id`,
  upload.single('avatar'),
  uploadToCloud.uploadSingle,
  controller.editPatch)
module.exports = route