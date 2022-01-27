import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../services/transaccion.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor(private transaccionService:TransaccionService) { }

  ngOnInit(): void {
    this.getTransacciones();
  }

  getTransacciones(){
    this.transaccionService.consultaTransacciones().subscribe(
      res => console.log(res)
      
    );
  }

}
