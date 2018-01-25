import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonvegDetailPage } from './nonveg-detail';

@NgModule({
  declarations: [
    NonvegDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NonvegDetailPage),
  ],
})
export class NonvegDetailPageModule {}
