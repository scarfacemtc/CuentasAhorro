import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CuentasComponent } from './cuentas/cuentas.component';
import { LoginComponent } from './login/login.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { TransaccionesCuentaComponent } from './transacciones-cuenta/transacciones-cuenta.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/cuentas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cuentas', component: CuentasComponent, canActivate: [AuthGuard] },
  { path: 'transacciones', component: TransaccionesComponent, canActivate: [AuthGuard] },
  { path: 'transacciones/:id', component: TransaccionesCuentaComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: RegisterClientComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/cuentas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
