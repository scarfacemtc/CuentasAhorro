import { Injectable } from '@angular/core';
import { ClienteInterface } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(){
    var clientes = JSON.parse(localStorage.getItem('clientes'));
    if(clientes == null) clientes = [];
    return clientes;
  }

  crearCliente(c:ClienteInterface){
    var clientes = this.getClientes();
    clientes.push(c);
    localStorage.setItem('clientes',JSON.stringify(clientes));
  }
}
