import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: 'login', 
    children: [
      {
        path: '', 
        pathMatch: 'full', 
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
  {path:'register', component: RegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
