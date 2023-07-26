import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'https://nominatim.openstreetmap.org/search?';

  constructor(private http: HttpClient) { }

  searchAddress(query: string) {
    const params = {
      q: query,
      format: 'json',
      countrycodes: 'IN',
    };
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
