// eventosinscritos.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventosinscritos',
  templateUrl: './eventosinscritos.page.html',
  styleUrls: ['./eventosinscritos.page.scss'],
})
export class EventosinscritosPage implements OnInit {
  eventosInscritos: any[] = [];

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.loadEventosInscritos();
  }

  // Funciónnnnnnnnnnnnnnnnnnn cargar eventos desde JSON
  loadEventosInscritos() {
    this.http.get<any[]>('http://localhost:3000/qrData').subscribe(data => {
      this.eventosInscritos = data;
    });
  }

  // Funciónnnnnnnnnnnnnnnnn eliminar evento 
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
            this.eventosInscritos = this.eventosInscritos.filter(e => e.id !== evento.id);
          }
        }
      ]
    });
    await alert.present();
  }

  // Fuuuuuuuuuuunciónnnnnnn agregar comentario 
  async agregarComentario(evento: any) {
    const alert = await this.alertController.create({
      header: 'Dejar un comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea',
          placeholder: 'Escribe tu comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.comentario) {
              this.guardarComentario(evento.id, data.comentario);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Funciónnnnnnnnnnnnnnnnnn guardar comentario JSON
  guardarComentario(eventoId: number, comentario: string) {
    const comentarioData = { eventoId, comentario };

    this.http.post('http://localhost:3000/qrData', comentarioData).subscribe(() => {
      this.eventosInscritos.find(e => e.id === eventoId).comentario = comentario;
    });
  }
}


