const dashboardRoute = require('./dashboard.route');
const productRoute= require('./product.route');
const trashRoute=require('./trash.route');
// tao 
const systemConfig= require('../../config/system');
const path=systemConfig.prefixAdmin
module.exports =(app)=>{
  // khi khop voi duong dan /admin se dua vao route tuong ung ( admin/ client)
app.use(`/${path}/dashboard`,dashboardRoute)
app.use(`/${path}/products`,productRoute)
app.use( `/${path}/trash`,trashRoute)
}
