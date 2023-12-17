import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { InsumosComponent } from './insumos/insumos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UserModalComponent } from './usuarios/user-modal/user-modal.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'insumos', component: InsumosComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'usuariosAdmins', component: UsuariosComponent },
      { path: 'usuariosAdmins/:id', component: UserModalComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
