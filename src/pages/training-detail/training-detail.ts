import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';

/**
 * Generated class for the TrainingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        this.provider
            .getById(this.navParams.get('id'))
            .on('value', eventData => {
                this.currentEvent = eventData.val();
                this.currentEvent.id = eventData.key;
            });
    }

    register(): void {

    }

}
