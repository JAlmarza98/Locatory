import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_KEY2} from '../keys';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  API_KEY = API_KEY2;

  constructor(private http: HttpClient) { }

  searchDirection(search: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=${search}`);
  }
}
