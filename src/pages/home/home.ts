import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddTrainingPage } from '../add-training/add-training';

import { WorkshopProvider } from '../../providers/workshop/workshop';
import { workshop } from '../../interface/workshop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public workshopData: Array<any>;

    constructor(public navCtrl: NavController, public provider: WorkshopProvider) { }

    ionViewDidLoad() {
        this.provider.get().on('value', workshopListSnapshot => {
            this.workshopData = [];
            workshopListSnapshot.forEach(snap => {
                this.workshopData.push({
                    id: snap.key,
                    startDate: snap.val().startDate,
                    cost: snap.val().cost,
                    location: snap.val().location
                });
                return false;
            });
        });
    }

  addTraining() {
      this.navCtrl.push(AddTrainingPage);
  }
}
