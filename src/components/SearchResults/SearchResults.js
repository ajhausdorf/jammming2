import './SearchResults.css';
import React from 'react';
import { TrackList } from '../TrackList/TrackList';


export class SearchResults extends React.Component {
    render() {
        if(this.props.searchResults.length > 1) {
            return(    
                <div className="SearchResults">
                    <h2>Results</h2>
                    <TrackList playlistTracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
                </div>
            )
        } else {
            return(    
                <div className="SearchResults">
                    <h3>Search to populate the list!</h3>
                </div>
            )
        }
    }
}