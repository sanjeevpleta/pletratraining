import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkshopDetailPage } from './workshop-detail';

@NgModule({
  declarations: [
    WorkshopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkshopDetailPage),
  ],
})
export class WorkshopDetailPageModule {}
