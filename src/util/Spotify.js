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
    search(term) {
        const accessToken = Spotify.getAccessToken();
        const url = 'https://api.spotify.com/v1/search?type=track&q=' + term;
        return fetch(url, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            if(response.ok) {
                let jsonResponse = response.json();
                return jsonResponse;
            }
            throw new Error('request failed!');
        }, (networkError => console.log(networkError.message)))
        .then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            let tracks = jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
            }));
            return tracks
        });
    }
}