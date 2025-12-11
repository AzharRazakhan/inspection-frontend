import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/api/auth';
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }




  clearToken() {
    localStorage.removeItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
      .then(ok => console.log('Navigation success:', ok))
      .catch(err => console.error('Navigation error:', err));
  }
}
