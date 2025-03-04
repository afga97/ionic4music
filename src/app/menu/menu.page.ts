import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private store: Storage
  ) { }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close()
  }

  logout(){
    this.store.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login')
  }

}
