import React from 'react'

const generateSearch = (status) => {
    if(status){
        return <div className="search">searching..</div>
    }
    return <div className="no-search"></div>
}

const Search = (props) => generateSearch(props.status) 

export default Search