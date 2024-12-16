import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eventosinscritos',
  templateUrl: './eventosinscritos.page.html',
  styleUrls: ['./eventosinscritos.page.scss'],
})
export class EventosinscritosPage implements OnInit {
  eventosInscritos: any[] = [];

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadEventosInscritos();
  }

  
  loadEventosInscritos() {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}'); 
    
    this.http.get<any[]>('https://apialmacen.onrender.com/qrData')
      .subscribe(
        data => {
          
          this.eventosInscritos = data.filter(evento => evento.email === userData.email);
          
          if (this.eventosInscritos.length === 0) {
            this.presentToast('No tienes eventos inscritos.', 'warning');
          }
        },
        error => {
          this.presentToast('Error al cargar los eventos inscritos', 'danger');
        }
      );
  }

  
  async eliminarEvento(evento: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar tu registro del evento "${evento.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`https://apialmacen.onrender.com/qrData/${evento.id}`).subscribe(
              () => {
              
                this.eventosInscritos = this.eventosInscritos.filter(e => e.id !== evento.id);
                this.presentToast('Registro eliminado correctamente', 'success');
              },
              error => {
                this.presentToast('Error al eliminar el registro', 'danger');
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

 
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}