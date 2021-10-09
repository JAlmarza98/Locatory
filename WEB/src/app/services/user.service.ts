import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {LoginForm, RegisterForm, UpdateForm, Usuario} from '../models';

const url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: this.token,
      },
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${url}/auth`, {headers: {Authorization: this.token}}).pipe(
        map((resp: any) => {
          const {email, name, role, status, uid} = resp.user;
          this.usuario = new Usuario(name, email, '', status, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((err) => of(false)));
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${url}/users`, formData).pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  actualizarUsuario(formData: UpdateForm) {
    formData = {...formData};
    return this.http.put(`${url}/users/${this.uid}`, formData, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${url}/auth/login`, formData).pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  loginGoogle(idToken: any) {
    return this.http.post(`${url}/auth/google`, {idToken}).pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  obtenerMiData() {
    return this.http.get(`${url}/users/me`, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
