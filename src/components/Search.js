import React, {Component} from 'react';
import {withRouter} from "react-router-dom"

class Search extends Component {

    state = {
        searchValue:""
    }

    handleChange = (e) => {
        this.setState({searchValue:e.target.value})
    }

    search = (e)=>{
        e.preventDefault();
        this.props.history.push(`/search=${this.state.searchValue}`);
        this.setState({searchValue:""});
    }


    render() {
        return(
            <form className="SearchForm" onSubmit={this.search}>
                <input type="text" value={this.state.searchValue} placeholder="Find how to fix it" onChange={this.handleChange}/>
                <input type="submit" value="Search"/>
            </form>
        )
    }
}


export default withRouter(Search);