import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterface } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:AuthInterface;
  loginForm:FormGroup;

  constructor(
    private authService:AuthService, 
    private formBuilder:FormBuilder,
    private router:Router
  )
  {
    if (this.authService.loggedIn) 
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('',[Validators.email, Validators.required]),
        password: new FormControl('',Validators.required),
        returnSecureToken: new FormControl(true)
      }
    );
  }

  logIn(){
    this.authService.signIn(this.loginForm.value).subscribe(
      res => {
        console.log('res login:',res);
        this.authService.handleUser(res);
        this.router.navigate(['/cuentas']);
      }
    );
  }

}
