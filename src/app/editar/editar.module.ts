import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPageRoutingModule } from './editar-routing.module';

import { EditarPage } from './editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditarPageRoutingModule
  ],
  declarations: [EditarPage]
})
export class EditarPageModule {}
