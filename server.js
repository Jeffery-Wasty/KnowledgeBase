let express = require('express')  
let app = express()  
let path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let db = require('./Database/TableGenerator.js')
let pool = require('./Database/databaseConnection.js');

app.use(express.static(path.join(__dirname)));

app.get('/', async (req, res) =>{
    console.log("test");
    await db.resetDatabase();
    console.log('1');
    await db.addDummyData();
    console.log('2');
    await db.test();
    res.send("success")
    let user = {fname: 'Steave', lname: 'Cho', email: 'swcho@gmail.com', password: '123'};
    console.log(user);
    //console.log((await pool.promise().execute(`CALL GET_ALL_DISCUSSIONS()`))[0]);
    console.log((await pool.promise().execute(`CALL GET_DISCUSSIONS(1, 1)`))[0]);
    console.log((await pool.promise().execute(`CALL GET_DISCUSSIONS(2, 1)`))[0]);
    console.log((await pool.promise().execute(`CALL GET_USER_CONVERSATIONS(1)`))[0]);
});  


app.listen(process.env.PORT || 3000, 
    () => console.log("Express server listening on port %d", process.env.PORT || 3000));