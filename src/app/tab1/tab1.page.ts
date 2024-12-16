import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { IUsuarioRegistrado } from 'src/interfaces/IUsuarioRegistrado';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  
  formats = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128];

  // MUESTRAAA EL RESUTADO DEL QR
  qrResult: string | null = null;

  // ESTAS variable sirven para almacenar los datos del nuevo usuario 
  newUser: IUsuarioRegistrado = {
    id: 0,
    nombreUsuario: '',
    email: '',
    eventos: []
  };

  constructor(private apiCrud: ApicrudService) {}

  // ESTEEEE METODO NOS AYUDA EJECUTARLO
  scanSuccessHandler(event: string): void {
    console.log('Resultado del escaneo:', event);
    this.qrResult = event; 

    // Aca podemos redirigir al usuario o hacer algo con la URL (tambien lo toma com json)
    if (this.isValidURL(event)) {
      console.log('Se escaneó una URL:', event);
     
    } else {
      
      this.extractUserDataFromQRCode(event);
    }
  }

  // ACA PODEMOS VALIDAR LOS URLS COMO OBJETOS
  isValidURL(string: string): boolean {
    try {
      new URL(string); 
      return true; 
    } catch (e) {
      return false; 
    }
  }

  // AAAAAAAAAAAAAACA SE INTENTO EXTRAER LOS DATOS DEL QR
  extractUserDataFromQRCode(qrData: string): void {
    try {
   
      const userData = JSON.parse(qrData);

     
      if (userData.nombreUsuario && userData.email) {
        this.newUser = {
          ...userData,  
          id: new Date().getTime()  
        };

        
        this.saveUserToDatabase(this.newUser);
      } else {
        console.log('Datos del QR no son válidos');
      }
    } catch (error) {
      console.log('Error al procesar los datos del QR:', error);
    }
  }

 
  saveUserToDatabase(user: IUsuarioRegistrado): void {
    this.apiCrud.postUsuario(user).subscribe(
      (response) => {
        console.log('Usuario guardado correctamente:', response);
        alert('Usuario guardado exitosamente');
      },
      (error) => {
        console.error('Error al guardar el usuario:', error);
        alert('Hubo un error al guardar el usuario');
      }
    );
  }
}

