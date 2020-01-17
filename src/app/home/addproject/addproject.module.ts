import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprojectPageRoutingModule } from './addproject-routing.module';

import { AddprojectPage } from './addproject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprojectPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddprojectPage]
})
export class AddprojectPageModule {}
