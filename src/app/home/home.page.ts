import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  artists = [];
  songs = [];
  albums = []
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  }
  song = {}
  currentSong = {};
  newTime;

  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) {  }

  async ionViewDidEnter(){
    const artist = await this.musicService.getNewReleases()
    this.artists = await this.musicService.getArtists();
    this.songs = artist.albums.items.filter(e=> e.album_type == "single")
    this.albums = artist.albums.items.filter(e=> e.album_type == "album")
  }

  async showSongs(artist){
    const songs = await this.musicService.getArtistsTopTracks(artist.id)
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    })
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present()
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
      // console.log(this.currentSong.duration, this.currentSong.currentTime, this.newTime)
      // this.newTime = (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause()
    this.song.playing = false;
  }

  parseTime(time="0.00"){
    if(time){
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutos = Math.floor(partTime/60).toString();
      if (minutos.length == 1) {
        minutos = "0"+minutos
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }

      return minutos + ":" + seconds;
    }
  }

}
