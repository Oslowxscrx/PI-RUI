import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsumosComponent } from './insumos/insumos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    InsumosComponent,
    EmpleadosComponent,
    RolesComponent,
    UsuariosComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    InsumosComponent,
    EmpleadosComponent,
    RolesComponent,
    UsuariosComponent
  ]
})
export class PagesModule { }
