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
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider: ProfileProvider,
        public eventProvider: WorkshopProvider, public registerStudentProvider:RegisterStudentProvider){
        }

  ionViewDidload()
  
  { 
    
	this.registerStudentProvider.getRegisteredStudent().on('value', studentSnapshot => {
    this.student = studentSnapshot.val();
	console.log('in student');
	//console.log('status' + this.student.status);
       })
     	   
	
	/*
	this.registerStudentProvider.getRegisteredStudent().on('value', snap => {
            this.registeredStudent = [];
            snap.forEach(data => {
                    this.registeredStudent.push({
                    status: data.val().status,
                    userID: data.val().UserID,
                    eventID:data.val().EventId,
                                    
			});
                return false;
           });
        });		
    */
 }
 }   
 
 