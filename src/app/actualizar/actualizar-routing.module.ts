import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarPage } from './actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarPageRoutingModule {}
