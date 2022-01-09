import './App.css';
import React from 'react';
import { SearchResults} from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults: [{ name: 'track1', artist: 'artist1', album: 'album1', id: 1 }, { name: 'track2', artist: 'artist2', album: 'album2', id: 2 }, { name: 'track3', artist: 'artist3', album: 'album3', id: 3 }, { name: 'track4', artist: 'artist4', album: 'album4', id: 4}],
            playlistName: 'Playlist Name',
            playlistTracks: [{ name: 'track4', artist: 'artist4', album: 'album4', id: 4}]
        };
        this.changePlaylistName = this.changePlaylistName.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    addTrack(track) {
        let playlistTracks = this.state.playlistTracks;
        if(playlistTracks.find(t => t.id === track.id)) {
            alert("this song is already in the playlist");
            return
        }
        playlistTracks.push(track)
        this.setState({
            playlistTracks: playlistTracks
        })
    }
    removeTrack(track) {
        const playlistTracks = this.state.playlistTracks;
        const newPlaylistTracks = playlistTracks.filter(t => t.id != track.id);
        this.setState({
            playlistTracks: newPlaylistTracks
        })
    }

    changePlaylistName(newName) {
        this.setState({
            playlistName: newName
        });
    }
    render() {
        return(    
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <SearchBar />
                <div className="App">
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.changePlaylistName}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;