const express= require('express')
const router = express.Router();
const productControllers= require("../../controllers/client/product.controller")

router.get('/',productControllers.index)
router.get('/edit',productControllers.edit)
router.get('/create',productControllers.create)
router.get('/:slug',productControllers.detail)

module.exports= router 