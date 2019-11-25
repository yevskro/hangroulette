"use strict"
const express = require('express')
const port = process.env.PORT || 5000
const app = express()

app.get('/game', (req, res) => {
    res.send("boohoo")
})

app.listen(port)