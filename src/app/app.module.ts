import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { GuestsFilterPipe } from './guests-filter.pipe';
import { LoginComponent } from './login/login.component';
import { LoginGaurd } from './login/login.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AdminComponent,
    GuestsFilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
