import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {

  registroForm: FormGroup;

  nuevoUsuario = {
    username: '',
    email: '',
    password: '',
    rut: '',  
    isactive: false,
    profileImage: '', 
  };

  userdata: any;

  constructor(private menuCtrl: MenuController,
              private fBuilder: FormBuilder,
              private authservice: AuthService,
              private alertCtrl: AlertController,
              private router: Router) {

    // Definirrrrrr formulario 
    this.registroForm = this.fBuilder.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'confirmPassword': new FormControl('', Validators.required),
      'rut': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)])  
    }, { validators: this.passwordsMatch });
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'first');
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoUsuario.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  crearUsuario() {
    if (this.registroForm.valid) {
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp => {
        this.userdata = resp;
        
        if (this.userdata.length > 0) {
          this.registroForm.reset();
          this.errorDuplicidad();
        } else {
          this.nuevoUsuario.username = this.registroForm.value.username;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.rut = this.registroForm.value.rut;  
          this.nuevoUsuario.isactive = true;

          this.authservice.PostUsuario(this.nuevoUsuario).subscribe(
            async () => {
              this.registroForm.reset();
              await this.mostrarMensaje();
              this.router.navigateByUrl('/home');
            },
            async (error) => {
              const alert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Hubo un problema creando el usuario. Inténtalo de nuevo.',
                buttons: ['OK']
              });
              await alert.present();
            }
          );
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertCtrl.create({
      header: 'Usuario creado',
      message: `Bienvenid@, ${this.nuevoUsuario.username}!`,
      buttons: ['OK']
    });
    await alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertCtrl.create({
      header: 'Error..',
      message: `El usuario ${this.nuevoUsuario.username} ya está registrado.`,
      buttons: ['OK']
    });
    await alerta.present();
  }
}
