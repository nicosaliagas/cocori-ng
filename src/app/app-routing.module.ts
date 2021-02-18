import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'lib-demo', pathMatch: 'full' },
  {
    path: 'readme',
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'lib-demo',
    loadChildren: () => import('./pages/lib-demo/lib-demo.module').then(mod => mod.LibDemoModule)
  },
  {
    path: 'demos/generic-form',
    loadChildren: () => import('./pages/generic-form/generic-form.module').then(mod => mod.GenericFormModule)
  },
  {
    path: 'demos/static-form',
    loadChildren: () => import('./pages/static-form/static-form.module').then(mod => mod.StaticFormModule)
  },
  {
    path: 'demos/static-inputs-chained',
    loadChildren: () => import('./pages/static-inputs-chained/static-inputs-chained.module').then(mod => mod.StaticInputsChainedModule)
  },
  {
    path: 'demos/modal-page',
    loadChildren: () => import('./pages/modal-page/modal-page.module').then(mod => mod.ModalPageModule)
  },
  {
    path: 'component/grille',
    loadChildren: () => import('./pages/datagrid-demo/grille-demo.module').then(mod => mod.GrilleDemoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
