import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('Swiper')
  swiperRef:ElementRef | undefined;
  swiper?:Swiper;

  images =[
      'assets/evento1.jpg',
      'assets/EventoInicio2.jpg',
      'assets/TallerRobotica.jpg',




  ];
 

  constructor(private menuCtrl: MenuController) {}

  // Abre el menú lateral
  openMenu() {
    this.menuCtrl.open('first');
  }
}
