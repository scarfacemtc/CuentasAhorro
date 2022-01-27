import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransaccionInterface } from '../models/transaccion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private URI = 'https://mibanco-333616-default-rtdb.firebaseio.com/transacciones/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json';
  private authP:string;

  constructor(private http:HttpClient, private authService:AuthService) {
    this.authP = this.authService.getUserData().idToken;
  }

  consultaTransacciones(){
    return this.http.get<any>(this.URI,{params: {auth: this.authP}});
  }

  nuevaTransaccion(transaccion:TransaccionInterface){
    return this.http.post<any>(this.URI, transaccion, { params: { auth: this.authP }});
  }

}
