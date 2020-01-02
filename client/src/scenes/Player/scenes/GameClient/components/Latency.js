import React from 'react'
import "../../../../../styles/Latency.css"

const generateLatency = (latency) => {
    if(latency < 100){
        return <div className="ltncy clr--grn ltncy--mrgn flt--left">{latency}ms</div>
    }
    else if(latency < 200){
        return <div className="ltncy clr--ylw ltncy--mrgn flt--left">{latency}ms</div>
    }
    
    return <div className="ltncy clr--rd ltncy--mrgn flt--left">{latency}ms</div>
}

const Latency = (props) => generateLatency(props.latency)

export default Latency