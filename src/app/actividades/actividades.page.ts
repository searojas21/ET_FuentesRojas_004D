import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {
  actividades: any[] = [];
  qrCodeData: string | null = null;
  mostrarQR: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apicrudService: ApicrudService
  ) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.apicrudService.getActividades().subscribe((actividades) => {
      this.actividades = actividades;
    });
  }

  // Método para modificar actividad
  editActividad(actividad: any) {
    this.router.navigate(['/editar', actividad.id], { state: { actividad } });
  }

  // Método para eliminar actividad
  deleteActividad(id: Number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      this.apicrudService.deleteActividad(Number(id)).subscribe(() => {
        this.actividades = this.actividades.filter((act) => act.id !== id);
        alert('Actividad eliminada exitosamente');
      });
    }
  }
}

