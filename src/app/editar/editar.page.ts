import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicrudService } from '../services/apicrud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IActividades } from 'src/interfaces/Iactividades';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  actividadForm: FormGroup;
  actividadImagen: string = '';
  actividadId: number | undefined;// ESTEEEE ME AYUDA ALMACENAR DESDE LA ID

  constructor(
    private fBuilder: FormBuilder,
    private apiCrudService: ApicrudService,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.actividadForm = this.fBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // ACA OBTENGO LA ID DE LA ACTIVIDAD
    this.actividadId = Number(this.route.snapshot.paramMap.get('id'));
  
    // AAAACA VERIFICO SI LA ID ES VALIDA
    if (isNaN(this.actividadId)) {
      console.error("ID de actividad no válido");
    } else {
      this.apiCrudService.getActividadID(this.actividadId).subscribe(actividad => {
        
        actividad.id = Number(actividad.id);
  
        this.actividadForm.setValue({
          nombre: actividad.nombre,
          descripcion: actividad.descripcion,
          fecha: actividad.fecha,
          horario: actividad.horario,
          ubicacion: actividad.ubicacion,
        });
      });
    }
  }
  
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.actividadImagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  
  editarActividad() {
    if (this.actividadForm.valid) {
      const actividadData = this.actividadForm.value;
      actividadData.id = this.actividadId; 
      
      if (this.actividadImagen) {
        actividadData.actividad_imagen = this.actividadImagen; 
      }
  
      // Llamar al API para actualizar con dos argumentos
      this.apiCrudService.putActividades(this.actividadId!, actividadData).subscribe(
        (response) => {
          this.showAlert('Evento modificado correctamente'); 
        },
        (error) => {
          console.error('Error al actualizar la actividad', error);
        }
      );
    }
  }
  
  


  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir a la página de actividades
            this.router.navigate(['/actividades']);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
}
