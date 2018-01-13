import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';
import { PaymentProvider } from '../../providers/payment/payment';
import {RegisterStudentProvider} from '../../providers/registeredstudent/registeredstudent';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
    public currentEvent: any = {};
    public userProfile: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public provider: PaymentProvider,
        public profileProvider: ProfileProvider,
		public registerProvider:RegisterStudentProvider) {
  }

  ionViewDidLoad() {
      
      this.currentEvent = this.navParams.get('eventData');

      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.val();
      });
  }

  Confirm(): void {
      this.provider.register(this.currentEvent.id);
	  this.registerProvider.createRegisterStudent('awaiting',this.userProfile.uid,this.currentEvent.id);
      this.navCtrl.push('ConfirmPage', { profile: this.userProfile, eventData: this.currentEvent });
  }
}