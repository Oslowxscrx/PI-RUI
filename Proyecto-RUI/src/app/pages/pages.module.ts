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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserModalComponent } from './usuarios/user-modal/user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [
    DashboardComponent,
    InsumosComponent,
    EmpleadosComponent,
    RolesComponent,
    UsuariosComponent,
    PagesComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
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
