import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router // Inyectamos el servicio Router para redirigir
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  async recoverPassword() {
    const email = this.recoverForm.value.email.trim().toLowerCase();
    const newPassword = this.recoverForm.value.newPassword;

    this.authService.GetUserByEmail(email).subscribe(
      async (users) => {
        if (users.length === 0) {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se encontró un usuario con este correo.',
            buttons: ['OK'],
          });
          await alert.present();
          return;
        }

        // Actualiza la contraseña
        const user = users[0];
        user.password = newPassword;

        this.authService.UpdateUsuario(user).subscribe(
          async () => {
            // Mostrar notificación de éxito
            const toast = await this.toastCtrl.create({
              message: 'Se ha cambiado la contraseña correctamente.',
              duration: 3000,
              color: 'success',
            });
            toast.present();

            // Redirigir al inicio de sesión después de un breve retraso
            setTimeout(() => {
              this.router.navigate(['/login']); // Cambiar '/login' por la ruta del login en tu aplicación
            }, 3000);
          },
          async (err) => {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Hubo un problema al actualizar la contraseña. Inténtelo más tarde.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        );
      },
      async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un problema al buscar el usuario. Inténtelo más tarde.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
