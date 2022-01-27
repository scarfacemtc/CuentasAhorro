import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaInterface } from '../models/cuenta.model';
import { AuthService } from '../services/auth.service';
import { CuentaService } from '../services/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  cuentasAhorro: CuentaInterface[];
  cuentaForm: FormGroup;
  filtroIdCliente:number;

  constructor(
    private cuentaService: CuentaService, 
    private authService: AuthService
  ){ }

  ngOnInit(): void {
    // const idCliente = this.authService.getUserData().localId;
    this.getCuentas();
    this.cuentaForm = new FormGroup({
      estado: new FormControl("Activa"),
      fechaUltimaAct: new FormControl(new Date().toISOString().slice(0, 10)),
      idCliente: new FormControl("", [Validators.required, Validators.min(0)]),
      numeroCuenta: new FormControl("", [Validators.required]),
      saldo: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*(\.[0-9]{0,2})?$')])
    });
  }

  createCuenta() {
    if(!this.isValidCuentaForm())
      return;
    
    this.cuentaService.altaCuenta(this.cuentaForm.value).subscribe(
      res => {
        console.log("res nueva cuenta:",res);
        this.ngOnInit();
      }
    );
  }

  isValidCuentaForm(){ // Método para validar formulario
    if (!this.cuentaForm.valid) {
      alert('Formulario inválido o vacío.')
      return false;
    }
    // Si encuentra una cuenta con el mismo ID
    var cuenta = this.cuentasAhorro.find(c => c.numeroCuenta == this.cuentaForm.get('numeroCuenta').value);
    if (cuenta) {
      alert('Ya existe ese número de cuenta.')
      return false;
    }
    return true;
  }

  getCuentas() {
    this.cuentaService.consultaCuentas().subscribe(
      res => {
        console.log(res);
        var cuentas = [];
        for (var i in res) {
          cuentas.push(res[i]);
        }
        this.cuentasAhorro = cuentas;
        this.sortCuentas();
      },
      err => {
        if (err.status == 401) { //Si no está autorizado
          this.authService.logOut();
        }

      }
    )
  }

  sortCuentas(){
    this.cuentasAhorro.sort((a,b) => {
      return Date.parse(b.fechaUltimaAct) - Date.parse(a.fechaUltimaAct);
    })
  }

  getCuentasDeCliente(){
    if(this.filtroIdCliente == null){
      this.getCuentas();
      return;
    }
    var cuentas_filtradas = [];
    this.cuentasAhorro.forEach( 
      c => {        
        if (c.idCliente == this.filtroIdCliente) {
          cuentas_filtradas.push(c);
        }
      }
    );
    
    this.cuentasAhorro = cuentas_filtradas;
  }

}
