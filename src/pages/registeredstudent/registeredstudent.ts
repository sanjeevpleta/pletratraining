import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';
import {RegisterStudentProvider} from '../../providers/registeredstudent/registeredstudent';
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
  public registeredStudent: Array<any> = null;
  public student:any = {};
  public status:any={};
  public sta:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider: ProfileProvider,
        public eventProvider: WorkshopProvider, public registerProvider:RegisterStudentProvider){
        }

  ionViewDidload()
  { 
    /*
      console.log('in register stiudent page');
	  this.registerProvider.getRegisteredStudent().on('value', studentSnapshot => {
      this.student= studentSnapshot.val();
	 
	  //this.sta = studentSnapshot.val();
      //console.log('in student'+this.student);
	  //console.log('in student'+studentSnapshot.val());
	 
	  });	   
	 
	*/

	 this.registerProvider.getRegisteredStudent().on('value', snap => {
            this.registeredStudent = [];
            snap.forEach(data => {
                    this.registeredStudent.push({
                    eventStatus: data.value.status,
                   });
                return false;
            });
        });    
 }
 }   
 
 