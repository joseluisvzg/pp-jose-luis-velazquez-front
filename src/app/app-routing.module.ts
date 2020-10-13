import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from "./perfil/perfil.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./core";

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' }},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Home' },
    children: [
      { path: '', component: PerfilComponent, data: { title: 'Home' }, runGuardsAndResolvers: 'always' },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
