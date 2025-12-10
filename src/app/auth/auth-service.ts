import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth'
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
    console.log('Logout called - removing token');   // debug
    localStorage.removeItem('token');

    // use navigateByUrl and handle promise
    this.router.navigateByUrl('/login')
      .then(ok => console.log('Navigation success:', ok))
      .catch(err => console.error('Navigation error:', err));
  }
}
