const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT




// nhung file config de ket noi voi database
const database = require("./config/database")
database.connect()

// body-parser la lib giup be nhan du lieu tu fe qua body trong fetch
// có 2 cách be nhận data từ query tren url, body trong feactch hoac post trong form
const bodyParser = require('body-parser');
// mac dinh khi chuyen data qua api la dang json ??
// chuyen json tu fe thanh js ben be luon nen khi nhan req.body la js luon
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded dùng để post từ form
app.use(bodyParser.urlencoded({ extended: false }));

// lib giúp show thông báo bằng express application
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');



//flash
// dung de luu 1 flash vao cookie tren web
app.use(cookieParser('HDSDF'))
//set thoi gian sonng cho flash
// khi reload se mat session nay != session hoc ben fe
app.use(session({
  cookie: {
    maxAge: 50000
  }
}))
app.use(flash())
//end flash


// nhung lib method_override
// de ghi de phuong thuc trong form
// mac dinh form la get, sau do la post
const methodOverride=require('method-override');
app.use(methodOverride('_method'))











// nhung route cua client va admin
const clientRoute = require("./Routes/client/index.route");
const adminRoute = require('./Routes/admin/index.route');

// set file public la file tinh
// trong file public dung / de di vao cac file con
// co __dirname de khi deploy len vercel no biet di tu thu muc goc /public
app.use('/', express.static(`${__dirname}/public`))


//set thu muc view la thu muc mac dinh khi chay trinh duyet
// mac dinh / se vao
app.set("views", `${__dirname}/views`)

// nhung template engine la pug
app.set("view engine", "pug")

// App local variables
// khi gan thi cac file trong template engine cung co the su dung bien ma k can rq
const systemConfig = require('./config/system');
// them key prefixAdmin vao  object local
app.locals.prefixAdmin = systemConfig.prefixAdmin


clientRoute(app)
adminRoute(app)
app.listen(port, () => {
  console.log("dang chay cong ", port);
})