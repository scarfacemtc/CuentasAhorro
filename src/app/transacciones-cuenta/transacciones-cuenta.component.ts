import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaInterface } from '../models/cuenta.model';
import { TransaccionInterface } from '../models/transaccion.model';
import { AuthService } from '../services/auth.service';
import { CuentaService } from '../services/cuenta.service';
import { TransaccionService } from '../services/transaccion.service';

@Component({
  selector: 'app-transacciones-cuenta',
  templateUrl: './transacciones-cuenta.component.html',
  styleUrls: ['./transacciones-cuenta.component.css']
})
export class TransaccionesCuentaComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef; //Boton para cerrar modal

  transacciones: TransaccionInterface[];
  transaccion: TransaccionInterface;

  idCuenta: string;
  cuentaActual: CuentaInterface;

  showMsg: boolean;


  constructor(
    private cuentaService: CuentaService,
    private transaccionService: TransaccionService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService) {
    this.idCuenta = this.activeRoute.snapshot.paramMap.get('id');
    this.cuentaActual = {
      estado: "",
      fechaUltimaAct: "",
      idCliente: 0,
      numeroCuenta: "",
      saldo: 0
    };
    this.showMsg = false;
  }

  ngOnInit(): void {
    this.getTransacciones();
    this.getCuentaActual();
    this.initTransaccion();
  }

  private getCuentaActual() { // Método para obtener cuenta actual
    this.cuentaService.consultaCuentas().subscribe(
      res => {
        var cuentas = new Array<CuentaInterface>();
        for (var i in res) { //Conversion de objeto a arreglo
          cuentas.push(res[i]);
        }
        this.cuentaActual = cuentas.find(c => c.numeroCuenta == this.idCuenta);
        console.log(this.cuentaActual);
      }
    );
  }

  private getTransacciones() { //Método para obtener las transaciones de cuenta actual
    this.transaccionService.consultaTransacciones().subscribe(
      res => {
        var transacciones = [];
        for (var i in res) {
          if (res[i].numeroCuenta == this.idCuenta) {
            transacciones.push(res[i]);
          }
        }
        this.transacciones = transacciones;
        this.sortTransacciones();
        console.log(this.transacciones);
        this.transacciones.length == 0? this.showMsg = true:this.showMsg = false; //Bandera para mostrar msj
      },
      err => {
        if (err.status == 401) { //Si no está autorizado
          this.authService.logOut();
        }
      }
    )
  }

  sortTransacciones() { // Método p/ordenar transacciones por fecha
    this.transacciones.sort(
      (a: TransaccionInterface, b: TransaccionInterface) => {
        return Date.parse(b.fechaUltimaAct) - Date.parse(a.fechaUltimaAct)
      }
    );
  }

  createTransaccion() { //Método para postear transaccion después de pasar las validaciones
    if (!this.isValidTransaccion())
      return;
    console.log(this.transaccion);

    this.transaccionService.nuevaTransaccion(this.transaccion).subscribe(
      res => {
        console.log(res);
        this.transacciones.push(this.transaccion);
        this.sortTransacciones();
        this.closeModal.nativeElement.click(); //Cierra modal de transaccion y se inicializa objeto transaccion
        if (this.showMsg) this.showMsg = false;
      }
    );
  }

  initTransaccion() { //Inicializa valores de la transacción, asignando # de cuenta
    this.transaccion = {
      fechaUltimaAct: "",
      monto: 0,
      numeroCuenta: this.idCuenta,
      terminal: "TERM255",
      tipo: "",
      usuario: "u-231"
    }
  }

  isValidTransaccion(): boolean { //Método para validar transacción
    if (this.transaccion.monto <= 0) {
      alert("Monto no es válido");
      return false;
    }
    if (this.transaccion.tipo == "Retiro") {
      if (this.cuentaActual.saldo == 0){
        alert("No tienes fondos suficientes");
        return false;
      }
      if (this.cuentaActual.saldo - this.transaccion.monto < 0) {
        alert("No se puede retirar más de " + this.cuentaActual.saldo);
        return false;
      }
      this.cuentaActual.saldo -= this.transaccion.monto;
    }
    if (this.transaccion.tipo == 'Deposito') {
      this.cuentaActual.saldo += this.transaccion.monto;
    }
    this.transaccion.fechaUltimaAct = new Date().toISOString(); //Se asigna fecha de la transacción
    return true;
  }

}
