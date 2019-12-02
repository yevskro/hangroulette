"use strict"
const path = require('path')
const express = require('express')
const port = process.env.PORT || 5000
const app = express()

app.use(express.static(path.resolve() + "/client/public/"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve() + "/client/public/index.html")
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
