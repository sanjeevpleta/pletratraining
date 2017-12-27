import { Component } from '@angular/core';
import {
    Alert,
    AlertController,
    IonicPage,
    NavController
} from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { WorkshopProvider } from '../../providers/workshop/workshop';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    public userProfile: any;
    public birthDate: string;
    public registeredEvents: Array<any> = null;
    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public authProvider: AuthProvider,
        public profileProvider: ProfileProvider,
        public eventProvider: WorkshopProvider
    ) {
  }

  ionViewDidLoad() {
      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.val();
          this.birthDate = userProfileSnapshot.val().birthDate;
          //userProfileSnapshot.val().registeredEvents.forEach(snap => {
          //    this.registeredEvents.push({
          //        status: snap.val().status
          //    });
          //});
      });

      this.profileProvider.getRegisteredEvents().on('value', snap => {
          this.registeredEvents = [];
          snap.forEach(data => {
              let value: any = this.getEvent(data.val().eventId);
              console.log('value = ' + value);
              this.registeredEvents.push({
                  eventType: value.eventType,
                  date: value.startDate,
                  location: value.location,
                  status: data.val().status,
                  eventId: data.key
              });
              return false;
          });
      });

      //console.log('Profile = ' + this.userProfile.registeredEvents);
  }
  getEvent(eventID: string): any {
      let value: any = '';
      //console.log('event id = ' + eventID);
      this.eventProvider
          .getById(eventID)
          .on('value', eventData => {
              console.log('eventdata = ' + eventData.val().eventType);
              value = eventData.val()
          });
      return value;
  }

  unRegister(key: string): void {
      //console.log("key = " + key);
      this.profileProvider.unRegister(key);
  }

  logOut(): void {
      this.authProvider.logoutUser().then(() => {
          this.navCtrl.setRoot('LoginPage');
      });
  }

  updateName(): void {
      const alert: Alert = this.alertCtrl.create({
          message: 'Your first name & last name',
          inputs: [
              {
                  name: 'firstName',
                  placeholder: 'Your first name',
                  value: this.userProfile.firstName
              },
              {
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              }
          ],
          buttons: [
              { text: 'Cancel' },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileProvider.updateName(data.firstName, data.lastName);
                  }
              }
          ]
      });
      alert.present();
  }

  updateDOB(birthDate: string): void {
      this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(): void {
      let alert: Alert = this.alertCtrl.create({
          inputs: [
              { name: 'newEmail', placeholder: 'Your new email' },
              { name: 'password', placeholder: 'Your password', type: 'password' }
          ],
          buttons: [
              { text: 'Cancel' },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileProvider
                          .updateEmail(data.newEmail, data.password)
                          .then(() => {
                              console.log('Email Changed Successfully');
                          })
                          .catch(error => {
                              console.log('ERROR: ' + error.message);
                          });
                  }
              }
          ]
      });
      alert.present();
  }

  updatePassword(): void {
      let alert: Alert = this.alertCtrl.create({
          inputs: [
              { name: 'newPassword', placeholder: 'New password', type: 'password' },
              { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
          ],
          buttons: [
              { text: 'Cancel' },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileProvider.updatePassword(
                          data.newPassword,
                          data.oldPassword
                      );
                  }
              }
          ]
      });
      alert.present();
  }

  updateMobile(mobileNumber: number): void {
      this.profileProvider.updateMobile(mobileNumber);
  }

  goToHome(): void {
      this.navCtrl.setRoot(HomePage);
  }
}
