import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarContrasenaPage } from './recuperar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarContrasenaPageRoutingModule {}
