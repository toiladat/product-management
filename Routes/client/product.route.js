const express= require('express')
const router = express.Router();
const productControllers= require("../../controllers/client/product.controller")

router.get('/',productControllers.index)
router.get('/detail/:slug',productControllers.detail)
router.get(`/:slugCategory`,productControllers.category)
module.exports= router 