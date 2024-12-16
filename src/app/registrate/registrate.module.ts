import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistratePageRoutingModule } from './registrate-routing.module';

import { RegistratePage } from './registrate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistratePageRoutingModule
  ],
  declarations: [RegistratePage]
})
export class RegistratePageModule {}
