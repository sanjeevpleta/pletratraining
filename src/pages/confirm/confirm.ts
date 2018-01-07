import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EmailProvider } from '../../providers/email/email';
@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
    public currentEvent: any = {};
    public userProfile: any = {};
    private message: string = "";
    constructor(public navCtrl: NavController, public navParams: NavParams
        , private emailProvider: EmailProvider
    ) {
  }

    ionViewDidLoad() {
        this.currentEvent = this.navParams.get('eventData');
        this.userProfile = this.navParams.get('profile');

        this.getMessage();

        this.emailProvider.sendEmail(this.userProfile.email,
            '',
            'info@pletratech.com',
            '',
            'Pletra training - Payment details',
            'Dear student \n Thanks for registering ' + this.currentEvent.eventType + '.\n Here are our bank details to transfer fee for confirmation.\n' + this.message
        );
    }

    getMessage() {
        
        this.emailProvider.getMessage().on('value', messagesnap => {
            messagesnap.forEach(snap => {
                this.message = snap.val().message
                //console.log('message = ' + this.message);
                return false;
            });

            if (this.message == null) {
                this.message = '2. Bank name: State bank of India \nBank account name: Pletratech Pvt ltd. \nAccount number: 000023452345 \nIFSC: SBIN0002345';                
            }

        });
    }

  goBackHome(): void {
      this.navCtrl.setRoot(HomePage);
  }
}
