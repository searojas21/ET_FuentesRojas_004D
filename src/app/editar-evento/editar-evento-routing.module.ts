import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEventoPage } from './editar-evento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEventoPageRoutingModule {}
