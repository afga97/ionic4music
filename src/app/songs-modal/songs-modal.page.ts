import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {

  songs: any[] = []
  artist: string = ""
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ionViewDidEnter(){
    const { songs, artist } = this.navParams.data;
    this.songs = songs;
    this.artist = artist;
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }

}
