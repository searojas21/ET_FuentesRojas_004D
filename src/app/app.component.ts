import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = true;
  opciones = [
    { name: 'Inicio', icon: 'home', redirecTo: '/home' },
    { name: 'Actividades', icon: 'calendar-outline', redirecTo: '/actividades' },
    { name: 'Perfil', icon: 'person', redirecTo: '/mostrar-perfil' },
    { name: 'Cerrar Sesión', icon: 'person-remove-outline', redirecTo: '/login', action: 'logout' },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !(event.url.includes('/login') || event.url.includes('/registrate'));
      }
    });
  }

  // Método para cerrar la sesión
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  handleOption(option: any) {
    if (option.action === 'logout') {
      this.logout();
    } else {
      this.router.navigate([option.redirecTo]);
    }
  }
}


