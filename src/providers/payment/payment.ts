//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class PaymentProvider {
    public registeredEvents: firebase.database.Reference;
    public currentUser: firebase.User;
    constructor() {

      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.currentUser = user;
              this.registeredEvents = firebase
                  .database()
                  .ref(`/userProfile/${user.uid}/registeredEvents`);
          }
      });
  }

    register(eventId: string): void {
        console.log('in register');
        if (this.registeredEvents != null) {
            this.registeredEvents.push({
                eventId: eventId,
                status: 'Awaiting'
            });
        }
    }
    unRegister(eventId: string): void {
        if (this.registeredEvents != null) {
            this.registeredEvents.child(eventId).remove();
        }
    }

  getRegisteredEvent(): firebase.database.Reference {
      return this.registeredEvents;
  }

  setPaymentStatus(paymentId: string, paymentStatus: string): void {
      var updates = {};
      updates[`/register/${this.currentUser.uid}/${paymentId}`]({
          status: paymentStatus 
      });
      this.registeredEvents.update(updates)
  }

}
