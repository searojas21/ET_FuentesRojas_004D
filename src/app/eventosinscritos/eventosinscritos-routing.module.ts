import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosinscritosPage } from './eventosinscritos.page';

const routes: Routes = [
  {
    path: '',
    component: EventosinscritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosinscritosPageRoutingModule {}
