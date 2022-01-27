import { Pipe, PipeTransform } from '@angular/core';
import { CuentaInterface } from '../models/cuenta.model';

@Pipe({
  name: 'filtroCuenta'
})
export class FiltroCuentaPipe implements PipeTransform {

  transform(cuentas:CuentaInterface[], numCuenta: string):CuentaInterface[]{ 
    if (numCuenta == null) {
      return cuentas;
    }
    const cuentas_numCuenta = [];
    for (const c of cuentas) {
      if(c.numeroCuenta == numCuenta)
        cuentas_numCuenta.push(c);
    } 
    return cuentas_numCuenta;
  }

}
