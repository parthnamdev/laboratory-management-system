const express = require('express');
const path = require('path');

const homeRouter = require('./routers/homeRouter');

//express app
const app = express();
// const mongoose = require('mongoose');

//ejs view engines
app.set('view engine','ejs');
// app.set('views', path.join(__dirname, './views'))

//middleware and static files
// app.use(express.urlencoded({extended: true}));
// app.use(cookieParser(process.env.SESSION_SECRET));


//webpage display and load
app.use('/',express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + "/node_modules/@fortawesome"));

// app.use(bodyparser.urlencoded({extended:true}));

// main router
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