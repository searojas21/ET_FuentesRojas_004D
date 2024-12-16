import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPerfilPageRoutingModule } from './mostrar-perfil-routing.module';

import { MostrarPerfilPage } from './mostrar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPerfilPageRoutingModule
  ],
  declarations: [MostrarPerfilPage]
})
export class MostrarPerfilPageModule {}
