import React from 'react'

const generateLatency = (latency) => {
    if(latency < 100){
        return <div className="latency progress-good">{latency}ms</div>
    }
    else if(latency < 200){
        return <div className="latency progress-caution">{latency}ms</div>
    }
    
    return <div className="latency progress-bad">{latency}ms</div>
}

const Latency = (props) => generateLatency(props.latency)

export default Latency