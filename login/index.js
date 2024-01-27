const express = require('express')
const app = express()
const port = 5002
app.use(express.json());
const cors = require('cors');
app.use(cors());
require('dotenv').config();




const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING
).then(() => {
    console.log('Connected to database');
}).catch (() => {
    console.log('Connection failed');
});


 const routes = require('./routes/route')
 app.use(routes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log("code: ", err.code)
    const statusCode = err.code || 500;
    const message = err.message || 'Something broke!';
    res.status(statusCode).send(message);
  });
  
app.listen(port, () => {
    console.log('App listening on port 5002')
})