import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddTrainingPage } from '../pages/add-training/add-training';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { CourseProvider } from '../providers/course/course';
import { WorkshopProvider } from '../providers/workshop/workshop';
import { PaymentProvider } from '../providers/payment/payment';
import { EmailProvider } from '../providers/email/email';
import { RegisteredstudentPage } from '../pages/registeredstudent/registeredstudent';
import {RegisterStudentProvider} from  '../providers/registeredstudent/registeredstudent' 
@NgModule({
  declarations: [
    MyApp,
      HomePage,
      AddTrainingPage,
	  RegisteredstudentPage
	
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      HomePage,
      AddTrainingPage,
      RegisteredstudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	EmailComposer,
    AuthProvider,
    ProfileProvider,
    CourseProvider,
    WorkshopProvider,
    PaymentProvider,
	EmailProvider,
	RegisterStudentProvider
  ]
})
export class AppModule {}
