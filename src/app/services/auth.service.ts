import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private apiUrl = environment.apiUrl + '/usuarios';

  constructor(private httpclient: HttpClient) { }

  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  GetUsuarioId(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  // Obtenerrrrrrr usuario por nombre 
  GetUserByUsername(username: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${this.apiUrl}?username=${username}`);
  }

  // Actualizarrrrrrr usuario
  UpdateUsuario(usuario: Users): Observable<Users> {
    return this.httpclient.put<Users>(`${this.apiUrl}/${usuario.id}`, usuario);
  }
  GetUserByEmail(email: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${this.apiUrl}?email=${email}`);
  }
}

