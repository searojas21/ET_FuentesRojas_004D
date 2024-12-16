import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { IActividades } from 'src/interfaces/Iactividades';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  actividad:any;

  id:any;

  evento={
    id:0,
    nombre:"",
    fecha:"" ,
    horario:"",
    ubicacion:"" ,
    descripcion:"",
    actividad_imagen: "" 



  }

  constructor(private activated: ActivatedRoute, 
    private router: Router, private alertcontroller: AlertController, 
    private apicrud: ApicrudService) {
      this.activated.queryParams.subscribe(param =>{
        this.actividad =JSON.parse(param['actividad']);
      })
     }

  ngOnInit() {
    this.id = this.actividad.id;
    this.evento = this.actividad;
    
  }


  actualizarActividad(actividad: any) {
  this.router.navigate(['/actualizar', this.evento.id], {
    queryParams: { actividad: JSON.stringify(actividad) }
  });
}
  
  volver(){
    this.router.navigate(['/actividades']);
  }

  
  


}
