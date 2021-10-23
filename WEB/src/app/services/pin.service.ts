import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {newPinForm} from 'src/app/models';

const url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: this.token,
      },
    };
  }

  getPinsByCategory(categoryId: string) {
    return this.http.get(`${url}/api/pin/${categoryId}`, this.headers);
  }

  createNewPin(pinData: newPinForm) {
    return this.http.post(`${url}/api/pin`, pinData, this.headers);
  }

  deletePin(pinId: string) {
    return this.http.delete(`${url}/api/pin/${pinId}`, this.headers);
  }
}
