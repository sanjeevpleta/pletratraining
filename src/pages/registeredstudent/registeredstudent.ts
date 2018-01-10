import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';
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
   //public registeredEvents: Array<any> = null;
   public WorkshopList: firebase.database.Reference
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
                const workshopRef: firebase.database.Reference = firebase.database().ref('workshop');
             // console.log('workshop list : ' + this.WorkshopList);
				workshopRef.on('value',workSnapshot=>{
				this.registeredEvent=workSnapshot.val().eventType;
	       
        });
   }
}
