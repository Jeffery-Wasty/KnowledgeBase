require("./utils/envUtil");
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const expressHbs = require('express-handlebars');
const session = require('express-session')
const socket = require("./utils/websocket")

app
  .engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts',
      defaultLayout: 'default',
      extname: 'hbs'
    })
  )
  .set('view engine', 'hbs')
  .set('views', 'views')
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: false
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)

const server = socket.start(app);
server.listen(process.env.PORT || 3002, console.log("server running"));