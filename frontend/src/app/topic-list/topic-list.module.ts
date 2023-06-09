import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicListPageRoutingModule } from './topic-list-routing.module';

import { TopicListPage } from './topic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicListPageRoutingModule
  ],
  declarations: [TopicListPage]
})
export class TopicListPageModule {}
