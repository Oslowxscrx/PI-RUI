import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Otras rutas...
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'shared',  // Cambia a la ruta específica de tu aplicación
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  { path: '**', component: NotFoundComponent }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
