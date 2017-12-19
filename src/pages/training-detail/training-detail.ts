import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';

@IonicPage()
@Component({
  selector: 'page-training-detail',
  templateUrl: 'training-detail.html',
})
export class TrainingDetailPage {
    public currentEvent: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams, public provider: WorkshopProvider) {
  }

    ionViewDidLoad() {
        console.log("id : " + this.navParams.get('id'));
        this.provider
            .getById(this.navParams.get('id'))
            .on('value', eventData => {
                console.log('event data : ' + eventData.val());
                this.currentEvent = eventData.val();
                console.log('current event = ' + this.currentEvent.cost);
                this.currentEvent.id = eventData.key;
            });
    }

    register(): void {
        this.navCtrl.push('RegisterPage', { 'eventData': this.currentEvent });
    }

}
