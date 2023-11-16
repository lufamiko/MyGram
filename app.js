const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.get("/", (req, res) => {
    res.send("Hello from railway")
})


module.exports = app