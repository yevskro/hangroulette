"use strict"
import express      from 'express'
import path         from 'path'
import ServerGame   from './Game'

const port = 30001 //process.env.PORT || 80
const app = express()

app.use(express.static(path.resolve(__dirname, "../dist/")));
app.get('*', (req, res) => {
    console.log("app requested from " + req.socket.remoteAddress + " " + Date())
    res.redirect('http://85.187.151.42');
})

const serverGame = new ServerGame(10, 30001, 5, false)
app.listen(port)
console.log("http server launched")