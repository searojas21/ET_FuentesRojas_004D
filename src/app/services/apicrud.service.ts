import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActividades,IActividad } from 'src/interfaces/Iactividades';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  getActividades():Observable<IActividades[]>{
    return this.httpclient.get<IActividades[]>(`${environment.apiUrl}/actividades`);
  }

  postActividades(newActividad: IActividad):Observable<IActividad>{
    return this.httpclient.post<IActividad>(`${environment.apiUrl}/actividades`, newActividad);
  }

  getActividadID(id:number):Observable<IActividades>{
    return this.httpclient.get<IActividades>(`${environment.apiUrl}/actividades/?id=${id}`);
  }

  putActividades(actividad:any):Observable<IActividades>{
    return this.httpclient.put<IActividades>(`${environment.apiUrl}/actividades/${actividad.id}`, actividad);
  }

  deleteActividad(actividad:any):Observable<IActividades>{
    return this.httpclient.delete<IActividades>(`${environment.apiUrl}/actividades/${actividad.id}`);
  }

}
