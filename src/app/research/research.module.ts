import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResearchPageRoutingModule } from './research-routing.module';

import { ResearchPage } from './research.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResearchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResearchPage]
})
export class ResearchPageModule {}
