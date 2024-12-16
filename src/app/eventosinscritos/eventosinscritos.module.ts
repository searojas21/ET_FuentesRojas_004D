import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosinscritosPageRoutingModule } from './eventosinscritos-routing.module';

import { EventosinscritosPage } from './eventosinscritos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosinscritosPageRoutingModule
  ],
  declarations: [EventosinscritosPage]
})
export class EventosinscritosPageModule {}
