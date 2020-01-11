import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides = [
    {
      title: 'Escucha tu musica',
      subTitle: 'EN CUALQUIER LUGAR',
      description: 'Los mejores albumes, las mejores cancioens. Escucha y comparte en cualquier momento, a todas horas.',
      icon: 'play'
    },
    {
      title: 'Disfruta de nuesto reproductor',
      subTitle: 'DE VIDEOS INCREIBLES',
      description: 'Entra al modo video de nuestro reproductor y obten acceso a clips, documentales y making offs increibles de tu artista favorito',
      icon: 'videocam'
    },
    {
      title: 'Accede al exclusivo',
      subTitle: 'MODO DEPORTE',
      description: 'Crea una playlist basada en ty actividad fisica. Ten reportes y acceso a lo que necesites integrado con GPS!.',
      icon: 'bicycle'
    }
  ]
  
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  finish(){
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/home')
  }

  ngOnInit() {
  }

}
