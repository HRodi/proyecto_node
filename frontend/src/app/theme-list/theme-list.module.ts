import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemeListPageRoutingModule } from './theme-list-routing.module';

import { ThemeListPage } from './theme-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemeListPageRoutingModule
  ],
  declarations: [ThemeListPage]
})
export class ThemeListPageModule {}
