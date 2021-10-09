import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

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
    return this.http.get(`${url}/pin/${categoryId}`, this.headers);
  }
}
