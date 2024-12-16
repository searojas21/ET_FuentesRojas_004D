import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarPerfilPage } from './mostrar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarPerfilPageRoutingModule {}
