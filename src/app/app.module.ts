import { RestaurantService } from '../modules/restaurant/restaurant.service';
import { LoginService } from '../modules/login/login-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../modules/login/login.component';
import { RestaurantComponent } from '../modules/restaurant/restaurant.component';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from '../modules/admin/admin.component';
import { AdminPanelComponent } from '../modules/admin-panel/admin-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestaurantComponent,
    AdminComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
   
  ],
  providers: [LoginService,RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
