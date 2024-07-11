const dashboardRoute = require('./dashboard.route');
const productRoute= require('./product.route');
const trashRoute=require('./trash.route');
const productCatagoryRoute=require('./products-category.route');
const rolesRoute=require('./roles.route');
// tao 
const systemConfig= require('../../config/system');
const path=systemConfig.prefixAdmin
module.exports =(app)=>{
  // khi khop voi duong dan /admin se dua vao route tuong ung ( admin/ client)
app.use(`/${path}/dashboard`,dashboardRoute)
app.use(`/${path}/products`,productRoute)
app.use( `/${path}/trash`,trashRoute)
app.use( `/${path}/products-category`,productCatagoryRoute)
app.use( `/${path}/roles`,rolesRoute)

}
