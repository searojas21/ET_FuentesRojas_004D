import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';1
import { AutorizadoGuard } from './guards/autorizado.guard';
import { InvitadoGuard } from './guards/invitado.guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then(m => m.ActividadesPageModule)
    ,canActivate: [AutorizadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registrate',
    loadChildren: () => import('./registrate/registrate.module').then(m => m.RegistratePageModule),
    canActivate: [InvitadoGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [InvitadoGuard],

  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'eventosinscritos',
    loadChildren: () => import('./eventosinscritos/eventosinscritos.module').then( m => m.EventosinscritosPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'tabs/tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
  },   {
    path: 'mostrar-perfil',
    loadChildren: () => import('./mostrar-perfil/mostrar-perfil.module').then( m => m.MostrarPerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule),
    canActivate: [InvitadoGuard],

  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
