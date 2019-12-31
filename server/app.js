"use strict"
import express from 'express'
import path from 'path'
import ServerGame from './game'

const port = process.env.PORT || 80
const app = express()

app.use(express.static(path.resolve(__dirname, "../dist/")));
app.get('*', (req, res) => {
    console.log("app requested from " + req.socket.remoteAddress + " " + Date())
    //res.sendFile(path.resolve(__dirname, "../dist/"))
})

const serverGame = new ServerGame(10, 5001, 5, false)
app.listen(port)
console.log("http server launched")