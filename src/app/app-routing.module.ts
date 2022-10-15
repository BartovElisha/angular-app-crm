import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component'
import { TestFirebaseComponent } from './components/test-firebase/test-firebase.component';
import { IfUserLogin } from './services/authGate.service';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IfUserLogin],
    children: [
      {path: '', component: CustomersComponent},
      {path: 'edit', component: EditUserComponent}
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'edit', component: EditUserComponent},
  {path: 'testdb', component: TestFirebaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
