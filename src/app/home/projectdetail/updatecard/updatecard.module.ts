import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecardPageRoutingModule } from './updatecard-routing.module';

import { UpdatecardPage } from './updatecard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatecardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatecardPage]
})
export class UpdatecardPageModule {}
