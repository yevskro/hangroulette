"use strict"
import express from 'express'
import path from 'path'
import ServerGame from './ServerGame'

const port = process.env.PORT || 5000
const app = express()

app.use(express.static(path.resolve() + "/client/public/"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve() + "/client/public/index.html")
})

const serverGame = new ServerGame(10, 5001, 5, false)
app.listen(port)