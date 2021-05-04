import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsLayoutComponent } from './layouts/cms-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'lib-demo', pathMatch: 'full' },
  {
    path: 'readme',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'lib-demo',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/lib-demo/lib-demo.module').then(mod => mod.LibDemoModule)
  },
  {
    path: 'demos/generic-form',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/generic-form/generic-form.module').then(mod => mod.GenericFormModule)
  },
  {
    path: 'demos/static-form',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/static-form/static-form.module').then(mod => mod.StaticFormModule)
  },
  {
    path: 'demos/static-inputs-chained',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/static-inputs-chained/static-inputs-chained.module').then(mod => mod.StaticInputsChainedModule)
  },
  {
    path: 'demos/modal-page',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/modal-page/modal-page.module').then(mod => mod.ModalPageModule)
  },
  {
    path: 'page-cms/editor',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/page-cms/page-cms.module').then(mod => mod.PageCMSModule)
  },
  {
    path: 'page-cms/preview',
    loadChildren: () => import('./pages/page-cms/page-cms.module').then(mod => mod.PageCMSModule)
  },
  {
    path: 'component/grille',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/datagrid-demo/grille-demo.module').then(mod => mod.GrilleDemoModule)
  },
  {
    path: 'component/upload',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/uploader-demo/uploader-demo.module').then(mod => mod.UploaderDemoModule)
  },
  {
    path: 'component/wysiwyg',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/wysiwyg-demo/wysiwyg-demo.module').then(mod => mod.WysiwygDemoModule)
  },
  {
    path: 'component/colorpicker',
    component: CmsLayoutComponent,
    loadChildren: () => import('./pages/colorpicker-demo/colorpicker-demo.module').then(mod => mod.ColorpickerDemoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
