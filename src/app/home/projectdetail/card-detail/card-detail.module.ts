import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardDetailPageRoutingModule } from './card-detail-routing.module';

import { CardDetailPage } from './card-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CardDetailPage,]
})
export class CardDetailPageModule {}
