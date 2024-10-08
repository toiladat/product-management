const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT
const path=require('path');


const http=require('http');
const {Server}=require('socket.io');
// tao 1 server
const server=http.createServer(app)
//tao 1 socket cho sv do
const io=new Server(server)
// tao bien _io dung duoc trong cac file .js o phia be( contrller.js)
//locals dung o file pug thoi
global._io=io


// nhung file config de ket noi voi database
const database = require("./config/database")
database.connect()

// body-parser la lib giup be nhan du lieu tu fe qua body trong fetch
// có 2 cách be nhận data từ query tren url, body trong fetch hoac post trong form
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




// nhung tinymce vao du an
//tra ve 1 chuoi html tu 1 doan minh nhap vao
// new route to the tinymce node module
//path.join de noi chuoi =>path
//khoi tao route khi truy cap /tinymce = /product-management/node_modules/tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


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
const { log } = require("console");
// them key prefixAdmin vao  object local
app.locals.prefixAdmin = systemConfig.prefixAdmin


clientRoute(app)
adminRoute(app)
app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found"
  });
});
// dung tu server chu k phai app vi server no bao trum ca app
//neu dung tu app.listen thi se khong ap dung duoc socket
server.listen(port, () => {
  console.log("dang chay cong ", port);
})