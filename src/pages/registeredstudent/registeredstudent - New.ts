import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';
import {RegisterStudentProvider} from '../../providers/registeredstudent/registeredstudent';
import {Alert, AlertController} from 'ionic-angular';
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
  public modifiedData:Array<any>=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider: ProfileProvider,
        public eventProvider: WorkshopProvider, public registerProvider:RegisterStudentProvider,public alertCtrl: AlertController){
          this.modifiedData=JSON.parse(JSON.stringify(this.registeredStudent));
        }

  ionViewDidLoad()
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
    this.modifiedData=JSON.parse(JSON.stringify(this.registeredStudent));
        
    this.registerProvider.getRegisteredStudent().on('value', snap => {
	        
			console.log('snap '+snap); 
            this.registeredStudent = [];
             snap.forEach(data => {
			 let value:any= this.getEvent(data.val().eventdata);
			 let value1:any=this.getUser(data.val().userdata);
			 console.log('value='+value);
			   console.log('data'+data); 
                    this.registeredStudent.push({
                    eventStatus: data.val().status,
                    eventType: value.eventType,
                    userName:value1,  
                    eventData: data.key,
                    eventDate:value.startDate
                });
                return false;
            });console.log('length'+ this.registeredStudent.length)
            console.log('status')
           
        });
        
    }
    filterData()
        {   
            this.modifiedData=[];    
            this.modifiedData=JSON.parse(JSON.stringify(this.registeredStudent));
            this.modifiedData= this.modifiedData.filter((data)=>{
                return false;
            })
        }
	getEvent(eventID: string): any {
        let value: any = '';
        //console.log('event id = ' + eventID);
        this.eventProvider
            .getById(eventID)
            .on('value', eventData => {
                //console.log('eventdata = ' + eventData.val().eventType);
                value = eventData.val()
            });
        return value;
    }
	
	getUser(userId: string):any{
	     let value: any = '';
		 this.profileProvider.getUserById(userId).on('value',userData=>{
		      console.log('userData='+userData.val().firstName)
			  value = userData.val().firstName +' '+ userData.val().lastName
		 });
		 return value;
    } 

    changePaymentStatus(id:string):void{
        console.log('In status function');
        console.log('id'+id);
        //console.log('status'+eventStatus);
        this.registerProvider.updateStatus(id,'Paid');
        //console.log('provider return value'+this.registerProvider.updateStatus(id ,'paid'));
    }
    getData(data:any,filter:string){
        var array: Array<any> = [];
        data.forEach(snap =>{
            if (snap.val().eventType == filter )
            {  
               array.push({
               startDate:snap.val().StartDate,             
            });
         }
         return false
        });
    }
  
}

   
 
 