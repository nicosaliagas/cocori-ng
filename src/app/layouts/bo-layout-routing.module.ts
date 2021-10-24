import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoLayoutComponent } from './bo-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BoLayoutComponent,
    // canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: '/bo/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../pages/home-page/home-page.module').then(mod => mod.HomePageModule) },
      { path: 'demo/generic-form', loadChildren: () => import('../pages/generic-form/generic-form.module').then(mod => mod.GenericFormModule) },
      { path: 'demo/static-form', loadChildren: () => import('../pages/static-form/static-form.module').then(mod => mod.StaticFormModule) },
      { path: 'demo/static-inputs-chained', loadChildren: () => import('../pages/static-inputs-chained/static-inputs-chained.module').then(mod => mod.StaticInputsChainedModule) },
      { path: 'demo/modal-page', loadChildren: () => import('../pages/modal-page/modal-page.module').then(mod => mod.ModalPageModule)},
      { path: 'cms/editor', loadChildren: () => import('../pages/page-cms/page-cms.module').then(mod => mod.PageCMSModule)},
      { path: 'cms/preview', loadChildren: () => import('../pages/page-cms/page-cms.module').then(mod => mod.PageCMSModule)},
      { path: 'component/grille', loadChildren: () => import('../pages/datagrid-demo/grille-demo.module').then(mod => mod.GrilleDemoModule)},
      { path: 'component/upload', loadChildren: () => import('../pages/uploader-demo/uploader-demo.module').then(mod => mod.UploaderDemoModule)},
      { path: 'component/wysiwyg', loadChildren: () => import('../pages/wysiwyg-demo/wysiwyg-demo.module').then(mod => mod.WysiwygDemoModule)},
      { path: 'component/colorpicker', loadChildren: () => import('../pages/colorpicker-demo/colorpicker-demo.module').then(mod => mod.ColorpickerDemoModule)},
      { path: 'component/toast', loadChildren: () => import('../pages/toast-demo/toast-demo.module').then(mod => mod.ToastDemoModule)},
      { path: 'component/date', loadChildren: () => import('../pages/demo-component/date-demo/date-demo.module').then(mod => mod.DateDemoModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CmsLayoutRoutingModule {
  constructor() { }
}