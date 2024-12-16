import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActividades, IActividad } from 'src/interfaces/Iactividades';
import { IUsuarioRegistrado } from 'src/interfaces/IUsuarioRegistrado'; 

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  private apiUrl = environment.apiUrl; 

  
  getActividades(): Observable<IActividades[]> {
    return this.httpclient.get<IActividades[]>(`${this.apiUrl}/actividades`);
  }
  
  postActividades(newActividad: IActividad): Observable<IActividad> {
    return this.httpclient.post<IActividad>(`${this.apiUrl}/actividades`, newActividad, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  getActividadID(id: number): Observable<IActividades> {
    return this.httpclient.get<IActividades>(`${this.apiUrl}/actividades/${id}`);
  }
  
  putActividades(id: number, actividad: Omit<IActividad, 'id'>): Observable<IActividades> {
    return this.httpclient.put<IActividades>(`${this.apiUrl}/actividades/${id}`, actividad, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  
  deleteActividad(id: number): Observable<IActividades> {
    return this.httpclient.delete<IActividades>(`${this.apiUrl}/actividades/${id}`);
  }
  
  
  getUsuarios(): Observable<IUsuarioRegistrado[]> {
    return this.httpclient.get<IUsuarioRegistrado[]>(`${this.apiUrl}/UsuariosRegistrados`);
  }
  
  postUsuario(newUsuario: IUsuarioRegistrado): Observable<IUsuarioRegistrado> {
    return this.httpclient.post<IUsuarioRegistrado>(`${this.apiUrl}/UsuariosRegistrados`, newUsuario, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  actualizarUsuario(id: number, usuario: IUsuarioRegistrado): Observable<IUsuarioRegistrado> {
    return this.httpclient.put<IUsuarioRegistrado>(`${this.apiUrl}/UsuariosRegistrados/${id}`, usuario, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
}

