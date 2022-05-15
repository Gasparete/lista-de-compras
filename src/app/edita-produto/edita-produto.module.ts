import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaProdutoPageRoutingModule } from './edita-produto-routing.module';

import { EditaProdutoPage } from './edita-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaProdutoPageRoutingModule
  ],
  declarations: [EditaProdutoPage]
})
export class EditaProdutoPageModule {}
