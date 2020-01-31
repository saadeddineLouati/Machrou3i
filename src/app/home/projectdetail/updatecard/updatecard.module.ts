import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecardPageRoutingModule } from './updatecard-routing.module';

import { UpdatecardPage } from './updatecard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatecardPageRoutingModule
  ],
  declarations: [UpdatecardPage]
})
export class UpdatecardPageModule {}
