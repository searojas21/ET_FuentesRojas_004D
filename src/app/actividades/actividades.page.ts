import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as LZString from 'lz-string';  

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {
  actividades: any[] = [];
  qrCodeData: string | null = null;
  actividadesRegistradas: Set<string> = new Set();  

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadClasses();
    this.loadRegisteredActivities();  
  }

  loadClasses() {
    this.http.get<any[]>('https://apialmacen.onrender.com/actividades').subscribe(actividades => {
      this.actividades = actividades;
    });
  }

 
  loadRegisteredActivities() {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.http.get<string[]>(`https://apialmacen.onrender.com/registrations?email=${userData.email}`)
      .subscribe((registrations) => {
        this.actividadesRegistradas = new Set(registrations);  
      });
  }

  registerToClass(selectedClass: any) {
    if (this.actividadesRegistradas.has(selectedClass.nombre)) {
      this.presentToast('Ya estás registrado en esta actividad.', 'warning');  
      return;
    }

    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

    
    const qrData = {
      id: selectedClass.id  
    };


    const url = `https://apialmacen.onrender.com/event/${qrData.id}`;  
    this.qrCodeData = url;

  

    this.http.post('https://apialmacen.onrender.com/qrData', qrData).subscribe(() => {
      this.actividadesRegistradas.add(selectedClass.nombre);  
      this.presentToast('¡Te has registrado correctamente!', 'success');
    });
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
