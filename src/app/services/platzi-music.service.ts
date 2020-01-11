import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  base_url = "https://platzi-music-api.now.sh/browse/new-releases"

  constructor() { }

  getArtists(){
    return dataArtists.items;

  }

  getNewReleases(){
    return fetch(this.base_url).then(response => response.json())
  }

  getArtistsTopTracks(artistId){
    return fetch(
      `https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO`
    ).then(response => response.json())
  }
}
