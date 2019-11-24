const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const expressHbs = require('express-handlebars');

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
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)
  .listen(process.env.PORT || 3002);