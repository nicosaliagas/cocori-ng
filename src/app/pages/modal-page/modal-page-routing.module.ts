import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModalPageComponent } from './modal-page.component';

const routes: Routes = [
  { path: '', component: ModalPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalPageRoutingModule { }
