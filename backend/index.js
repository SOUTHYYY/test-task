const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postsRoute = require('./routes/routes')

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', postsRoute)

mongoose.connect(
    'mongodb+srv://southyyy:southyyy@cluster0-rpdcw.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!')
)

app.listen(5000)
