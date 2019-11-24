let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      partialsDir: __dirname + '/views/partials/',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views/layouts'));

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes/routes'); 
 

/*app.get('/', async (req, res) => {
    res.render("./layouts/main-layout.hbs");
})*/

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`On localhost:${ PORT }`);
});

