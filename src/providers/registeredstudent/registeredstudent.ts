import firebase from 'firebase';

import { Injectable } from '@angular/core';
@Injectable()


export class RegisterStudentProvider {
	public registeredEvent: firebase.database.Reference;
    
	constructor() {
	       // firebase.auth().onAuthStateChanged(user => {
           //  if (user) {
                this.registeredEvent = firebase.database().ref('registerEvent');
                console.log('Registered Student list : ' + this.registeredEvent);
           //  }
        //});
        }

    createRegisterStudent(eventStatus:string,userId:string,eventId:string):firebase.database.ThenableReference{
       return this.registeredEvent.push({
	        status:eventStatus,
			user:userId,
			event:eventId,
	                
	   });
	}
	getRegisteredStudent(): firebase.database.Reference {
       return this.registeredEvent;
     }
  
 } 
  