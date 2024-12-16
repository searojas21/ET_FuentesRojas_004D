import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { Router } from '@angular/router';
import { IActividad } from 'src/interfaces/Iactividades';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  newActividad: IActividad = {
    nombre:"",
    fecha:"" ,
    horario:"",
    ubicacion:"" ,
    descripcion:"",
    actividad_imagen: "" 
  }

  constructor(private apicrud: ApicrudService,
              private router:Router
  ) { }

  ngOnInit() {
  }

  crearActividad(){
    this.apicrud.postActividades(this.newActividad).subscribe();
    this.router.navigate(['/actividades']);

  }

}
