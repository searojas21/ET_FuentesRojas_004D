import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service'; // Servicio para actividades
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  actividadForm: FormGroup;

  nuevaActividad = {
    nombre: '',
    descripcion: '',
    fecha: '',
    horario: '',
    ubicacion: '',
    actividad_imagen: '',
  };

  constructor(
    private menuCtrl: MenuController,
    private fBuilder: FormBuilder,
    private apiCrudService: ApicrudService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    
    this.actividadForm = this.fBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'first'); 
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevaActividad.actividad_imagen = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }

  crearActividad() {
    if (this.actividadForm.valid) {
      
      this.nuevaActividad.nombre = this.actividadForm.value.nombre;
      this.nuevaActividad.descripcion = this.actividadForm.value.descripcion;
      this.nuevaActividad.fecha = this.actividadForm.value.fecha;
      this.nuevaActividad.horario = this.actividadForm.value.horario;
      this.nuevaActividad.ubicacion = this.actividadForm.value.ubicacion;

      
      this.apiCrudService.postActividades(this.nuevaActividad).subscribe(
        async () => {
          this.actividadForm.reset();
          await this.mostrarMensaje();
          this.router.navigateByUrl('/tabs/tab3'); 
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Hubo un problema creando la actividad. Inténtalo de nuevo.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertCtrl.create({
      header: 'Actividad creada',
      message: `¡La actividad ${this.nuevaActividad.nombre} se ha creado correctamente!`,
      buttons: ['OK'],
    });
    await alerta.present();
  }
}





