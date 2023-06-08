import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InsumosComponent } from './pages/insumos/insumos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './auth/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    PagesComponent,
    DashboardComponent,
    InsumosComponent,
    EmpleadosComponent,
    RolesComponent,
    UsuariosComponent,
    NotFoundComponent,
    AuthComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
