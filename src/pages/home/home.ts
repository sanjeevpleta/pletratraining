import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddTrainingPage } from '../add-training/add-training';

import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';
//import { workshop } from '../../interface/workshop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public workshopData: Array<any> = null;
    public filter: string;
    public isAdmin: boolean = false;

    constructor(public navCtrl: NavController,
        public navParam: NavParams,
        public provider: WorkshopProvider,
        public publicProvider: ProfileProvider) {
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


        
        //console.log('user = ' + user);
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

        this.isAdmin = this.getAdmin();
    }

    getAdmin(): boolean {
        var retVal: boolean = false;
        this.publicProvider.getUserProfile().on('value', userProfileSnapshot => {
            //console.log(userProfileSnapshot.val());
            if (userProfileSnapshot.val().email.indexOf("@pletratech.com") > 0) {
                retVal = true;
            }

        });
        return retVal;  
    }

  addTraining(): void {
      this.navCtrl.push(AddTrainingPage);
    }

  goToDetail(id): void {
      this.navCtrl.push('TrainingDetailPage', {id: id});
  }
}
