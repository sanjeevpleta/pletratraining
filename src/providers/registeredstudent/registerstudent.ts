import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class RegisterstudentProvider {
    public registeredEvent: firebase.database.Reference;
    public currentUser: firebase.User;
    constructor() {
         firebase.auth().onAuthStateChanged(user => {
             if (user) {
                 this.currentUser = user;
                 this.registeredEvent = firebase.database().ref('registerevent');
                 console.log('Registered Student list : ' + this.registeredEvent);
               }
          });
    }

  createRegisterStudent(eventStatus: string, userId: string, eventId: string): firebase.database.ThenableReference {
      console.log('Registered Student list : ' + this.registeredEvent);
      return this.registeredEvent.push({
          status: eventStatus,
          userdata: this.currentUser.uid,
          eventdata: eventId,
      });

  }

}
