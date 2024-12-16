import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadesPage } from './actividades.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ActividadesPageRoutingModule } from './actividades-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesPageRoutingModule,
    QRCodeModule,
    RouterModule.forChild([
      {
        path:'',
        component: ActividadesPage
      }
    ])
  ],
  declarations: [ActividadesPage]
})
export class ActividadesPageModule {}
