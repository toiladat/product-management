const expres = require("express")
const route= expres.Router();
const dashboardController = require("../../controllers/admin/dashboard.controller")
route.get('/',dashboardController)
module.exports= route