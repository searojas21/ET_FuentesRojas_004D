import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-perfil',
  templateUrl: './mostrar-perfil.page.html',
  styleUrls: ['./mostrar-perfil.page.scss'],
})
export class MostrarPerfilPage implements OnInit {
  usuario: any; 
  defaultImage: string = 'assets/avatar.png'; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const username = sessionStorage.getItem('username') || ''; 
    this.authService.GetUserByUsername(username).subscribe((data) => {
      if (data && data.length > 0) {
        this.usuario = data[0];
      }
    });
  }

  editarPerfil() {
    this.router.navigate(['/perfil']); 
  }

  eventosinscritos() {
    this.router.navigate(['/eventosinscritos']); 
  }

  
}