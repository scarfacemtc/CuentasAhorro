import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuentaInterface } from '../models/cuenta.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private URI = `https://mibanco-333616-default-rtdb.firebaseio.com/cuentaAhorro/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json`;

  constructor(private http:HttpClient, private authService:AuthService) { }

  altaCuenta(cuenta:CuentaInterface){
    return this.http.post<any>(`${this.URI}?auth=${this.authService.getUserData().idToken}`,cuenta);
  }

  consultaCuentas(){
    return this.http.get<any>(`${this.URI}?auth=${this.authService.getUserData().idToken}`);
  }
}
