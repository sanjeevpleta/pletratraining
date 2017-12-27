import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { workshop } from '../../interface/workshop';

import { WorkshopProvider } from '../../providers/workshop/workshop';
/**
 * Generated class for the AddTrainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-training',
  templateUrl: 'add-training.html',
})
export class AddTrainingPage {
    public eventType: string;
    public eventDate: Date;
    public eventLocation: string;
    public eventCost: number;
    public eventDuration: string;
    public minDate: string;
    public maxDate: string;

    public newWorkshop: workshop = null; 
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public provider: WorkshopProvider) {
        //this.newWorkshop = new workshop;
        console.log(new Date().toDateString);
        this.minDate = new Date().getFullYear().toString() + "-" + new Date().getMonth().toString() + "-" + new Date().getDate().toString(); //new Date().getDate();
        this.maxDate = (new Date().getFullYear() + 1).toString() + "-" + new Date().getMonth().toString() + "-" + new Date().getDate().toString(); //new Date().getDate();
        //console.log(this.minDate.getDate());
    }


    setWorkshop(eventCost: number, eventDuration: string , eventDate: Date, eventLocation: string ) {
        console.log('location : ' + eventLocation);
        console.log('cost : ' + eventCost);
         
        //this.newWorkshop.cost = 300;
        //this.newWorkshop.startDate = eventDate;
        //this.newWorkshop.location = eventLocation;
    }

    setCourse() {

    }

    createTraining(eventCost: number,  eventDuration: string,eventDate: Date, eventLocation: string, eventType: string): void {
        //this.setWorkshop(eventCost, eventDate, eventLocation);
        console.log('In create training');
        this.provider.CreateWorkShop(eventCost, eventDuration , eventDate, eventLocation, eventType)
            .then(newTraining => {
                this.navCtrl.pop(); 
            })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTrainingPage');
  }

}
