import React from 'react'
import "../../../../../styles/Search.css"

const generateSearch = (status) => {
    if(status){
        return <div className="srch srch-lrg srch-styl-1 flx--mdl box--pos-abs-top">searching..</div>
    }
    return <div className="no-srch"></div>
}

const Search = (props) => generateSearch(props.status) 

export default Search