import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddTrainingPage } from '../add-training/add-training';

import { WorkshopProvider } from '../../providers/workshop/workshop';
//import { workshop } from '../../interface/workshop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public workshopData: Array<any> = null;
    public filter: string;

    constructor(public navCtrl: NavController, public navParam: NavParams, public provider: WorkshopProvider) {
        var p: string = this.navParam.get('param');

        switch (p) {
            case 'SW':
                this.filter = 'Salesforce Workshop';
                break;
            case 'SA':
                this.filter = 'Salesforce Admin';
                break;
            case 'SD':
                this.filter = 'Salesforce Developer';
                break;
            default:
                this.filter = '';
        }
    }

    ionViewDidLoad() {
        this.provider.get().on('value', workshopListSnapshot => {
            this.workshopData = [];
            workshopListSnapshot.forEach(snap => {
                if (snap.val().eventType == this.filter || this.filter == '') {
                this.workshopData.push({
                    id: snap.key,
                    startDate: snap.val().startDate,
                    cost: snap.val().cost,
                    location: snap.val().location
                });
            }
                return false;
            });
        });
    }

  addTraining(): void {
      this.navCtrl.push(AddTrainingPage);
    }

  goToDetail(id): void {
      this.navCtrl.push('TrainingDetailPage', {id: id});
  }
}
