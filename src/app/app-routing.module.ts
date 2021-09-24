import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  {
    path: 'connexion',
    loadChildren: () => import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'bo',
    loadChildren: () => import('./layouts/bo-layout.module').then((mod) => mod.BoLayoutModule),
  },
  { path: '**', redirectTo: 'connexion', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
