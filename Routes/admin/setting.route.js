const express = require("express")
const route = express.Router();
const multer = require('multer');
const uploadCloud = require('../../middewares/admin/uploadToCloud.middewares');
const controller = require("../../controllers/admin/setting.controller")


const upload = multer()
route.get('/general', controller.general)
route.patch(`/general`,
  upload.single('logo'),
  uploadCloud.uploadSingle,
  controller.generalPatch)
module.exports = route