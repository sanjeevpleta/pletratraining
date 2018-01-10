import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteredstudentPage } from './registeredstudent';

@NgModule({
  declarations: [
    RegisteredstudentPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteredstudentPage),
  ],
})
export class RegisteredstudentPageModule {}
