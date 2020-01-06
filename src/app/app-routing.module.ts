import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginGaurd } from './login/login.gaurd';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent,
    children: [{
      path: ':id', component: RegisterComponent
    }],
  },
  {
    path: '',
    component: RegisterComponent
  },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGaurd] },
  { path: 'login', component: LoginComponent }
  //{ path: 'staticPath', component: ... },   ptr
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
