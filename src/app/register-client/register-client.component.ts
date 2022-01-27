import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteInterface } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  clientes: ClienteInterface[];
  clienteForm: FormGroup;

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ) { 
  }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      id: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      edad: new FormControl('',[Validators.required]),
      genero: new FormControl('',[Validators.required])
    });
    this.clientes = this.clienteService.getClientes();
  }

  createCliente(){
    if(!this.isValidClienteForm())
      return;

    this.clienteService.crearCliente(this.clienteForm.value);
    this.ngOnInit();
  }

  isValidClienteForm(){
    if(!this.clienteForm.valid){
      alert("Favor de llenar todos los campos");
      return false;
    }
    
    if(this.clientes == null)
      return true;

    var cliente_aux = this.clientes.find(c => c.id == this.clienteForm.get('id').value); //Retorna cliente si lo encuentra
    if (cliente_aux) {
      alert('Ya existe un cliente con el ID '+ cliente_aux.id);
      return false;
    }
    return true;
  }

}
