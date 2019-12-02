"use strict"
const path = require('path')
const express = require('express')
const port = process.env.PORT || 5000
const app = express()

app.use(express.static(path.resolve() + "/client/public/"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve() + "/client/public/index.html")
})

const http = require('http')
const server = http.createServer(app)
server.listen(5001)

const websocket = require('websocket').server
const wsServer = new websocket({
    httpServer: server
})

const objSession = {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: "won",player: 1, players: 2, turn: 2,seconds: 0}
wsServer.on('request', function(request){
    var connection = request.accept(null,  request.origin)
    connection.send(JSON.stringify(objSession))
})

/*
/*
    turnTimer = () => {
        const incrementTimer = () => {
            if(this.state.turnSeconds === 0){
                clearInterval(id)
                this.setState({turnSeconds: 12, timerOn: false})
                this.props.onGuessTimeout()
                return
            }
            this.setState({turnSeconds: this.state.turnSeconds-1})
        }

        this.setState({timerOn: true})
        const id = setInterval(incrementTimer,1000)
    }
*/
app.listen(port)
