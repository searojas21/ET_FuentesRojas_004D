import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  actividad = {
    id: 0,
    nombre: "",
    fecha: "",
    horario: "",
    ubicacion: "",
    descripcion: "",
    actividad_imagen: ""
  };
  unaActividad: any;

  constructor(
    private activated: ActivatedRoute, 
    private router: Router,
    private alertcontroller: AlertController, 
    private apicrud: ApicrudService
  ) {
    
    this.activated.queryParams.subscribe(param => { 
      this.unaActividad = JSON.parse(param['actividad']);
    });
  }

  ngOnInit() {
    
    this.actividad = this.unaActividad;
  }

  // ACA NOS ALERTA PARA CONFIRMAR EL UPDATEEEE
  async updateActividad() {
    const alert = await this.alertcontroller.create({
      header: 'Actualización',
      message: '¿Desea modificar la información?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/actividades']);  
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.modificaActividad();
          },
        },
      ],
    });
    await alert.present();
  }


  modificaActividad() {
    this.apicrud.putActividades(this.actividad).subscribe(() => {
      this.mensaje();
    });
  }


  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Actualización',
      message: '¡La información ha sido modificada!',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/actividades']);  
          },
        },
      ],
    });
    await alert.present();
  }
}