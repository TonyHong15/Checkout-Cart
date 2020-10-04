const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

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

const itemRouter = require('./routes/items')
app.use('/items', itemRouter)

app.get('/', (req, res) => {
    res.sendFile('frontend/src/app.js', {'root': '../'})
})