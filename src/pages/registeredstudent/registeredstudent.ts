import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';
import firebase from 'firebase';
/**
 * Generated class for the RegisteredstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registeredstudent',
  templateUrl: 'registeredstudent.html',
})
export class RegisteredstudentPage {
   public registeredEvent:any;
   public registeredEvents: Array<any> = null;
   public userProfile: any;
   public WorkshopList: firebase.database.Reference
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider: ProfileProvider,
        public eventProvider: WorkshopProvider){
         } 
  
  
  
 // getData()
   //         { 
   //           const workshopRef: firebase.database.Reference = firebase.database().ref('workshop');
   //           console.log('workshop list : ' + this.WorkshopList);
	//			this.workshopRef.on('value',workSnapshot=>{
	//			this.registeredEvent=workSnapshot.val().eventType;
//			
  //          
  //      });
 // }
  
   ionViewDidLoad() {
     this.profileProvider.getRegisteredEvents().on('value',snap => {
      this.registeredEvents=[];
	  snap.forEach(data => {
	    let value :any =this.getEvent(data.val().EventId);
	      this.registeredEvents.push({
	      eventType:value.eventType,
		  userprofile:value.userProfile,
	      status:data.val().status,
	      eventId:data.key
	  });
	  return false;
	  });
   });
 }   
   getEvent(eventId:string):any{
     let value:any = '';
     this.eventProvider.getById(eventId).on('value',eventData =>{
	 value = eventData.val();
	 })	 
    return value;
   }
  
  
  
         //       const workshopRef: firebase.database.Reference = firebase.database().ref('workshop');
             // console.log('workshop list : ' + this.WorkshopList);
		//		workshopRef.on('value',workSnapshot=>{
		//		this.registeredEvent=workSnapshot.val().eventType;
	       
        //});
   }

