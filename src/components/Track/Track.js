import './Track.css';
import React from 'react';

export class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    addTrack() {
        const newTrack = this.props.track;
        this.props.onAdd(newTrack);
    }
    removeTrack() {
        const removedTrack = this.props.track;
        this.props.onRemove(removedTrack);
    }
    render() {
        return(    
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>
                {
                    this.props.isRemoval ? '-' : '+'
                }
            </button>
            </div>
        )
    }
}