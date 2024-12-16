import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.page.html',
  styleUrls: ['./editar-evento.page.scss'],
})
export class EditarEventoPage {

  eventName: string = '';
  eventDescription: string = '';
  selectedDateTime: string = '';
  showDateTime = false;

  constructor(private alertController: AlertController, private router: Router) {}

  toggleDateTime() {
    this.showDateTime = !this.showDateTime;
  }

  onDateTimeChange(event: any) {
    this.selectedDateTime = event.detail.value;
  }

  async onSubmit() {

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Evento editado correctamente',
      buttons: ['OK']
    });

    await alert.present();

    alert.onDidDismiss().then(() => {
      this.router.navigate(['/tabs/tab3']);
    });
  }
}




