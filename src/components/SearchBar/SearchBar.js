import './SearchBar.css';
import React from 'react';

export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchTerm: ''
        }
    }
    handleInputChange(e) {
        let searchTerm = e.target.value;
        this.setState({
            searchTerm: searchTerm
        })
    }
    search(e) {
        const searchTerm = this.state.searchTerm;
        this.props.onSearch(searchTerm);
        e.preventDefault();
    }
    render() {
        return(    
            <div className="SearchBar">
                <input className="SearchTerm" onChange={this.handleInputChange} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}