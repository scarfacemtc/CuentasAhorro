//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//Servicios
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { TransaccionesCuentaComponent } from './transacciones-cuenta/transacciones-cuenta.component';

//Locales
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es-MX";
import { FiltroClientePipe } from './pipes/filtro-cliente.pipe';
import { FiltroCuentaPipe } from './pipes/filtro-cuenta.pipe';
registerLocaleData(localeES, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterClientComponent,
    NavbarComponent,
    CuentasComponent,
    TransaccionesCuentaComponent,
    FiltroClientePipe,
    FiltroCuentaPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
