"use strict"
import express from 'express'
import path from 'path'
import http from 'http'
import websocket from 'websocket'
const port = process.env.PORT || 5000
const app = express()

app.use(express.static(path.resolve() + "/client/public/"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve() + "/client/public/index.html")
})

const server = http.createServer(app)
server.listen(5001)

const WebSocket = websocket.server
const wsServer = new WebSocket({
    httpServer: server
})

const objSession = {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: "won",player: 1, players: 2, turn: 2,seconds: 12}
wsServer.on('request', function(request){
    const connection = request.accept(null,  request.origin)
    connection.on('message', (message) => {
        // only message to recieve is the guess message
    })
    // grab new session, 
    // broadcast to the game room with the new session(user)
    connection.send(JSON.stringify(objSession))
    startTimer(12, connection, objSession)
})
// on close delete the session remove player from 
// game table
const startTimer = (seconds, connection, session) => {
    const incrementTimer = () => {
        connection.send(JSON.stringify(session))
        clearInterval(id)
        session.seconds = seconds - 1
        if(session.seconds !== -1){
            startTimer(seconds - 1, connection, session)
        }
    }
    const id = setInterval(incrementTimer,1000)
}

// create a new session, get a game that is available,
// get next available player spot, update session
// send session
// SessionClass, GameClass,
app.listen(port)
