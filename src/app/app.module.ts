import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './services/data/data.service';
import { KeycloakService } from './services/keycloak/keycloak.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    DataService,
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
