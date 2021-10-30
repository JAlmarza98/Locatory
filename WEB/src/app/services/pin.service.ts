import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {CargarPins, IPin, newPinForm} from 'src/app/models';
import {Observable} from 'rxjs';

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

  getPinsByCategory(categoryId: string):Observable<CargarPins> {
    return this.http.get<CargarPins>(`${url}/api/pin/${categoryId}`, this.headers);
  }

  createNewPin(pinData: newPinForm) {
    return this.http.post(`${url}/api/pin`, pinData, this.headers);
  }

  deletePin(pinId: string) {
    return this.http.delete(`${url}/api/pin/${pinId}`, this.headers);
  }

  editPin(pinId: string, pinData: IPin) {
    return this.http.put(`${url}/api/pin/${pinId}`, pinData, this.headers);
  }

  changePinStatus(pin: IPin) {
    return this.http.put(`${url}/api/pin/${pin.id}/status`, {}, this.headers);
  }
}
