import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkshopProvider } from '../../providers/workshop/workshop';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-training-detail',
  templateUrl: 'training-detail.html',
})
export class TrainingDetailPage {
    public currentEvent: any = {};
    public registeredEvents: Array<any> = null;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public provider: WorkshopProvider,
        public profileProvider: ProfileProvider
    ) {
    }

    getRegisteredEvents(): void {
        this.profileProvider.getRegisteredEvents().on('value', snap => {
            this.registeredEvents = [];
            snap.forEach(data => {
                //let value: any = this.getEvent(data.val().eventId);
                //console.log('value = ' + value);
                this.registeredEvents.push({
                    status: data.val().status,
                    eventId: data.val().eventId
                });
                return false;
            });
        });
    }

    ionViewDidLoad() {
        console.log("id : " + this.navParams.get('id'));
        this.getRegisteredEvents();
        this.provider
            .getById(this.navParams.get('id'))
            .on('value', eventData => {
                console.log('event data : ' + eventData.val());
                this.currentEvent = eventData.val();
                console.log('current event = ' + this.currentEvent.cost);
                this.currentEvent.id = eventData.key;
                this.currentEvent.status = this.getRegisteredStatus(eventData.key);
            });
    }

    getRegisteredStatus(eventId: string): string {
        let retVal: string = null;
        if (this.registeredEvents.length > 0) {
            this.registeredEvents.forEach(data => {
                if (data.eventId == eventId) {
                    retVal = data.status;
                }
            });
        }
        return retVal;
    }

    register(): void {
        this.navCtrl.push('RegisterPage', { 'eventData': this.currentEvent });
    }

}
