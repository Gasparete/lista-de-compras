import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaProdutoPage } from './edita-produto.page';

const routes: Routes = [
  {
    path: '',
    component: EditaProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaProdutoPageRoutingModule {}
