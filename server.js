const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const serveStatic = require('serve-static')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())
app.use(serveStatic(__dirname + '/frontend/dist' ))
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
}
app.listen(port, function() {
    console.log(`Server is running on port: ${port}`)
})

const itemRouter = require('./items')
app.use('/items', itemRouter)

