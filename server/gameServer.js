const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
server.listen(5001)

const websocket = require('websocket').server
const wsServer = new websocket({
    httpServer: server
})

wsServer.on('request', function(request){
    var connection = request.accept(null,  request.origin)
    console.log(request)
})
