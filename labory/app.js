const express = require('express');
const path = require('path');

const homeRouter = require('./routers/homeRouter');
const testRouter = require('./routers/testRouter');

//express app
const app = express();
const mongoose = require('mongoose');

//ejs view engines
app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'))

//middleware and static files
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser(process.env.SESSION_SECRET));

//db
// const uri = `${"mongodb+srv://"+process.env.ATLAS_USER+":"+process.env.ATLAS_PASSWORD+"@"+process.env.ATLAS_CLUSTER+".fzmhp.mongodb.net/"+process.env.ATLAS_DB_NAME+"?retryWrites=true&w=majority"}`;
const uri = 'mongodb://localhost:27017/laboryDB';
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("database connected");
});

//webpage display and load
app.use('/',express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/editReport',express.static(__dirname + '/public'));
app.use('/editReport',express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/test',express.static(__dirname + '/public'));
app.use('/test',express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/viewReport',express.static(__dirname + '/public'));
app.use('/viewReport',express.static(__dirname + "/node_modules/@fortawesome"));
// app.use(bodyparser.urlencoded({extended:true}));

app.use('/downloadReport',express.static(__dirname + '/public'));
app.use('/downloadReport',express.static(__dirname + "/node_modules/@fortawesome"));
// routers
app.use('/test', testRouter);
app.use('/', homeRouter);


const port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//     res.render("index");
// })

app.listen(port, () => {
    console.log("Server is running on PORT " + port +"...")
});

// app.get('*', (req, res) => {
//     res.status(404).render('404');
// });
// app.post('*', (req, res) => {
//     res.status(404).render('404');
// });

module.exports=app
