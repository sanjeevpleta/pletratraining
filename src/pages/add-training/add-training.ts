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

    public newWorkshop: workshop = null; 
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public provider: WorkshopProvider) {
        //this.newWorkshop = new workshop;
    }

    setWorkshop(eventCost: number, eventDate: Date, eventLocation: string) {
        console.log('location : ' + eventLocation);
        console.log('cost : ' + eventCost);

        //this.newWorkshop.cost = 300;
        //this.newWorkshop.startDate = eventDate;
        //this.newWorkshop.location = eventLocation;
    }

    setCourse() {

    }

    createTraining(eventCost: number, eventDate: Date, eventLocation: string): void {
        //this.setWorkshop(eventCost, eventDate, eventLocation);
        console.log('In create training');
        this.provider.CreateWorkShop(eventCost, eventDate, eventLocation)
            .then(newTraining => {
                this.navCtrl.pop();
            })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTrainingPage');
  }

}
