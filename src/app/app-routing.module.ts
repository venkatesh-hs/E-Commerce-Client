import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard/:id', component: UserDashboardComponent},
  {path: 'cart/:id', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
