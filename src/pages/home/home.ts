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
    public SalesforceAdmin: Array<any> = null;
    public SalesforceDeveloper: Array<any> = null;
    public Workshop: boolean = false;
    public Admin: boolean = false;
    public Developer: boolean = false;
    public filter: string;
    public isAdmin: boolean = false;

    constructor(public navCtrl: NavController,
        public navParam: NavParams,
        public provider: WorkshopProvider,
        public publicProvider: ProfileProvider) {
        var p: string = this.navParam.get('param');
        switch (p) {
            case 'SW':
                this.Workshop = true;
                break;
            case 'SA':
                this.Admin = true;
                break;
            case 'SD':
                this.Developer = true;
                break;
            default:
                this.Workshop = true;
                this.Admin = true;
                this.Developer = true;
        }



        //console.log('user = ' + user);
    }

    ionViewDidLoad() {
        this.provider.get().on('value', workshopListSnapshot => {
            this.workshopData = this.Getdata(workshopListSnapshot, 'Salesforce Workshop');
            this.SalesforceAdmin = this.Getdata(workshopListSnapshot, 'Salesforce Admin');
            this.SalesforceDeveloper = this.Getdata(workshopListSnapshot, 'Salesforce Developer');
        });

        this.isAdmin = this.getAdmin();
    }

    Getdata(data: any, filter: string): Array<any> {
        var array: Array<any> = [];
        data.forEach(snap => {
            if (snap.val().eventType == filter) {
                array.push({
                    id: snap.key,
                    startDate: snap.val().startDate,
                    cost: snap.val().cost,
                    location: snap.val().location
                });
            }
            return false;
        });
        return array;
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
        this.navCtrl.push('TrainingDetailPage', { id: id });
    }
}
