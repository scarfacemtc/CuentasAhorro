import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterface } from '../models/auth.model';
import { UserDataInterface } from '../models/userData.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URI ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI';
  private tiempoRetraso;
  
  constructor(private http:HttpClient, private router:Router) {  }

  signIn(user:AuthInterface){
    return this.http.post<any>(this.URI, user);
  }

  loggedIn(){
    return !!(sessionStorage.getItem('userData'));
  }

  handleUser(userData:UserDataInterface){ // Método para controlar sesión del usuario
    sessionStorage.setItem("userData",JSON.stringify(userData));
    this.setTimeoutLogout(userData.expiresIn);
  }

  private setTimeoutLogout(expiresIn:number){
    const timeout = expiresIn * 1000; // conversion de seg a ms
    this.tiempoRetraso = setTimeout(async () => { //Tiempo para finalizar sesión
      this.logOut();
    }, timeout); 
  }

  logOut(){
    clearTimeout(this.tiempoRetraso);
    console.log('sesion terminó');
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  getUserData():UserDataInterface{
    return JSON.parse(sessionStorage.getItem('userData'));
  }
  getToken(){
    return JSON.parse(sessionStorage.getItem('userData')).refreshToken;
  }
  
}
