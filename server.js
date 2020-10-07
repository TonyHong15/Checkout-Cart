const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, function() {
    console.log(`Server is running on port: ${port}`)
})

app.use(express.static(__dirname + '/frontend/dist' ))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/app.js");
});
const itemRouter = require('./items')
app.use('/items', itemRouter)

