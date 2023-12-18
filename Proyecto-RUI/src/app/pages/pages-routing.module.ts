import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AssetsComponent } from './insumos/insumos.component';
import { EmployeesComponent } from './empleados/empleados.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UserModalComponent } from './usuarios/user-modal/user-modal.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard], // Aquí aplicas AuthGuard
    children: [
      { path: 'login', component: DashboardComponent },
      { path: 'insumos', component: AssetsComponent },
      { path: 'empleados', component: EmployeesComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'usuariosAdmins', component: UsuariosComponent },
      { path: 'usuariosAdmins/:id', component: UserModalComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
