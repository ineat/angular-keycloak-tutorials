import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUnsecureData() {
    return this.http.get(this.apiUrl + '/', {responseType: 'text'});
  }

  getUserData() {
    return this.http.get(this.apiUrl + '/user', {responseType: 'text'});
  }

  getAdminData() {
    return this.http.get(this.apiUrl + '/admin', {responseType: 'text'});
  }

}
