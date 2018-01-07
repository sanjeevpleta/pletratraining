import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {

  }

  loginUser(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  sendEmailVerification(): void {
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function () {
          // Email sent.
      }).catch(function (error) {
          // An error happened.
      });
  }

  signupUser(email: string,
            password: string,
            firstname: string,
            lastname: string,
            pmobile: string): Promise<any> {
      return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(newUser => {
              firebase.database().ref(`/userProfile/${newUser.uid}`)
                  //.set(email);
                  .set({
                      firstName: firstname,
                      lastName: lastname,
                      email: email,
                      mobileNumber: pmobile
                  });
          })
          .catch(error => {
              console.error(error);
              throw new Error(error);
          });
  }

  resetPassword(email: string): Promise<any> {
      return firebase.auth().sendPasswordResetEmail(email).then(function () {
          // Email sent.
          return true;
      }).catch(function (error) {
          // An error happened.
          throw new Error(error);
      });
  }

  logoutUser(): Promise<void> {
      const userId: string = firebase.auth().currentUser.uid;
      firebase.database().ref(`/userProfile/${userId}`).off();
      return firebase.auth().signOut();
  }
}
