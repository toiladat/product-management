const express=require('express')
const homeControllers=require("../../controllers/client/home.controller")
const router= express.Router()
router.get('/',homeControllers.index)

module.exports= router