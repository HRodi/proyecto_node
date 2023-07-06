import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemePropertiesListPageRoutingModule } from './theme-properties-list-routing.module';

import { ThemePropertiesListPage } from './theme-properties-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemePropertiesListPageRoutingModule
  ],
  declarations: [ThemePropertiesListPage]
})
export class ThemePropertiesListPageModule {}
