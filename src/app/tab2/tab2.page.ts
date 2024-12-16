import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  actividadForm: FormGroup; // Formulario reactivo

  nuevaActividad = {
    id: 0, // Asegúrate de que el ID sea numérico
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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first'); 
    this.generarId(); 
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'first'); 
  }

  
  generarId() {
   
    const lastId = localStorage.getItem('lastId');
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1; 
    this.nuevaActividad.id = newId; 
    localStorage.setItem('lastId', newId.toString()); 
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
      const { nombre, descripcion, fecha, horario, ubicacion } =
        this.actividadForm.value;

      this.nuevaActividad = {
        id: this.nuevaActividad.id, 
        nombre,
        descripcion,
        fecha,
        horario,
        ubicacion,
        actividad_imagen: this.nuevaActividad.actividad_imagen,
      };

      this.apiCrudService.postActividades(this.nuevaActividad).subscribe(
        async () => {
          this.actividadForm.reset(); 
          await this.mostrarMensaje();
          this.router.navigateByUrl('/tabs/tab3');
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Hubo un problema creando la actividad.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertCtrl.create({
      header: 'Actividad creada',
      message: `¡La actividad ${this.nuevaActividad.nombre} se creó correctamente!`,
      buttons: ['OK'],
    });
    await alerta.present();
  }
}

