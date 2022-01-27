import { Pipe, PipeTransform } from '@angular/core';
import { CuentaInterface } from '../models/cuenta.model';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(cuentas:CuentaInterface[], idCliente: number): CuentaInterface[]{ 
    if (idCliente == null) {
      return cuentas;
    }
    const cuentas_cliente = [];
    for (const c of cuentas) {
      if(c.idCliente == idCliente)
        cuentas_cliente.push(c);
    } 
    return cuentas_cliente;
  }

}
