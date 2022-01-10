const CLIENT_ID = 'b310d4447d3b45cb8b45c22fd7522506';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;

export const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const params = window.location.href;
        const regex_access = /access_token=([^&]*)/;
        const regex_expire = /expires_in=([^&]*)/;

        if(params.match(regex_access, regex_expire)) {
            accessToken = params.match(regex_access)[1];
            const expiresIn = Number(params.match(regex_expire)[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const url = 'https://api.spotify.com/v1/search?type=track&q=' + term;
        try {
            const response = await fetch(url, { headers: {Authorization: `Bearer ${accessToken}`} });
            if(response.ok) {
                const jsonResponse = await response.json();
                if(!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        } catch(error) {
            console.log(error);
        }
    },
    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        };
        let userId;
        try {
            let response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
            if(response.ok) {
                let jsonResponse = await response.json();
                userId = jsonResponse.id;
                try {
                    response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName})
                    });
                    if(response.ok) {
                        jsonResponse = await response.json();
                        const playlistID = jsonResponse.id;
                        try {
                            response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({uris: trackURIs})
                            });
                            if(response.ok) {
                                jsonResponse = await response.json();
                                return jsonResponse;
                            }
                        } catch(error) {
                            console.log(error);
                        }
                    }
                }
                catch(error) {
                    console.log(error);
                }
            }
        } catch(error) {
            console.log(error);
        }
    }
}
