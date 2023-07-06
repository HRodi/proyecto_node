import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemePropertiesPageRoutingModule } from './theme-properties-routing.module';

import { ThemePropertiesPage } from './theme-properties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemePropertiesPageRoutingModule
  ],
  declarations: [ThemePropertiesPage]
})
export class ThemePropertiesPageModule {}
