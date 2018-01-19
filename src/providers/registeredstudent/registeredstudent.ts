import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class RegisterStudentProvider {
    public registeredEvent: firebase.database.Reference;
    public currentUser: firebase.User;
    constructor() {
         firebase.auth().onAuthStateChanged(user => {
             if (user) {
                 this.currentUser = user;
                 this.registeredEvent = firebase.database().ref('registerevent');
                 console.log('Registered Student list : ' + this.registeredEvent);
				 //console.log('status:'+eventStatus);
               }
          });
    }

   createRegisterStudent(eventStatus: string, userId: string, eventId: string): firebase.database.ThenableReference {
      console.log('Registered Student lit : ' + this.registeredEvent);
	  console.log('Registered status : ' + eventStatus);
	  console.log('user:'+this.currentUser.uid);
	      return this.registeredEvent.push({
          status: eventStatus,
          userdata: this.currentUser.uid,
          eventdata: eventId,	  
      });
	  
   } 
   
   getRegisteredStudent(): firebase.database.Reference  
    {
      return this.registeredEvent;
	}   
   
   getById(key: string): firebase.database.Reference 
    {
      return this.registeredEvent.child(key);
    } 
    
    updateStatus(id: string,status: string): Promise<any> {
        console.log('in provider method');
        //return this.registeredEvent.child('registeredEvents').child(id).update({status});
        return this.registeredEvent.child(id).update({status});
    }
	
}