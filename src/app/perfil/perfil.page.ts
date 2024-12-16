import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilForm: FormGroup;
  usuario: any;
  imagenPerfil: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router  
  ) {
    // ESTTEEE ME AYUDA A LAS VALIDACION DE PASWROODD
    this.perfilForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.minLength(8), 
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')  
      ]],
      confirmPassword: [''],  
      profileImage: ['']
    });
  }
//ACA RECONOCE EL LOGEADOOOO
  ngOnInit() {
    const username = sessionStorage.getItem('username') || '';  
    this.authService.GetUserByUsername(username).subscribe((data) => {
      if (data && data.length > 0) {
        this.usuario = data[0];
        this.perfilForm.patchValue({
          username: this.usuario.username,
          email: this.usuario.email,
          profileImage: this.usuario.profileImage || ''
        });
        this.imagenPerfil = this.usuario.profileImage || '';
      }
    });
  }

  async saveChanges() {
    if (this.perfilForm.valid) {
      const password = this.perfilForm.value.password;
      const confirmPassword = this.perfilForm.value.confirmPassword;

      // MEEEE AYUDA A VERIFICARR CONTRASEÑAASS
      if (password || confirmPassword) {
        
        if (!this.perfilForm.controls['password'].valid || password !== confirmPassword) {
          const toast = await this.toastController.create({
            message: 'Las contraseñas no coinciden o no cumplen con los requisitos.',
            duration: 3000,
            color: 'danger'
          });
          toast.present();
          return;
        }
      }

      const updatedUsuario = {
        ...this.usuario,
        ...this.perfilForm.value
      };

      // SI NO EXISTE CONTTRASEÑA NO SE SE ACTUALIZAAAAA
      if (!password) {
        delete updatedUsuario.password;
      }

      // Aaaactualizar los datos del usuario en el servidor
      this.authService.UpdateUsuario(updatedUsuario).subscribe(async () => {
        const toast = await this.toastController.create({
          message: 'Perfil actualizado correctamente.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      });
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPerfil = reader.result as string;
      this.perfilForm.patchValue({ profileImage: this.imagenPerfil });
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  
  Volver() {
    this.router.navigate(['/mostrar-perfil']);  
  }
}
