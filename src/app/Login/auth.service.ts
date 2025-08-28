import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5105/api/autenticacao/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    return token;
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
}
