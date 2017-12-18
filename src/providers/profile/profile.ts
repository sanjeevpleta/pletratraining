import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

    public userProfile: firebase.database.Reference;
    public currentUser: firebase.User;
  constructor() {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.currentUser = user;
              this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
          }
      });
  }

  getUserProfile(): firebase.database.Reference {
      return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
      return this.userProfile.update({ firstName, lastName });
  }
  updateDOB(birthDate: string): Promise<any> {
      return this.userProfile.update({ birthDate });
  }
}
