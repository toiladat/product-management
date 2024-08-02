const dashboardRoute = require('./dashboard.route');
const productRoute = require('./product.route');
const trashRoute = require('./trash.route');
const productCatagoryRoute = require('./products-category.route');
const rolesRoute = require('./roles.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const settingRoute = require('./setting.route');

// tao 
const authMiddewares = require('../../middewares/admin/auth.middewares');
const systemConfig = require('../../config/system');
const path = systemConfig.prefixAdmin
module.exports = (app) => {
  // khi khop voi duong dan /admin se dua vao route tuong ung ( admin/ client)
  app.use(`/${path}/dashboard`,
    authMiddewares,
    dashboardRoute)

  app.use(`/${path}/products`,
    authMiddewares,
    productRoute)

  app.use(`/${path}/trash`,
    authMiddewares,
    trashRoute)

  app.use(`/${path}/products-category`,
    authMiddewares,
    productCatagoryRoute)

  app.use(`/${path}/roles`,
    authMiddewares,
    rolesRoute)

  app.use(`/${path}/accounts`,
    authMiddewares,
    accountRoute)

  app.use(`/${path}/auth`, authRoute)

  app.use(`/${path}/settings`,
    authMiddewares,
    settingRoute)

}