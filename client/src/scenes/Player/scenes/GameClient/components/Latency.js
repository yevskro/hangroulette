import React from 'react'
import "../../../../../styles/Latency.css"

const generateLatency = (latency) => {
    if(latency < 100){
        return <div className="ltncy prg-good ltncy--mrgn flt--left">{latency}ms</div>
    }
    else if(latency < 200){
        return <div className="ltncy prg-caution ltncy--mrgn flt--left">{latency}ms</div>
    }
    
    return <div className="ltncy prg-bad ltncy--mrgn flt--left">{latency}ms</div>
}

const Latency = (props) => generateLatency(props.latency)

export default Latency