import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

    constructor(public navCtrl: NavController, public navParams: NavParams
        //, private emailComposer: EmailComposer
    ) {
  }

  ionViewDidLoad() {
      let email = {
          to: 'max@mustermann.de',
          cc: 'info@pletratech.com',
          subject: 'Pletra training - Payment details',
          body: 'Dear student \n Thanks for registering Salesforce workshop. \n Here are our bank details to transfer fee for confirmation. \n Bank Name: State bank of India \n Account: 0023452345234 \n IFSC: SBIN000234',
          isHtml: true
      };
  }

  goBackHome(): void {
      this.navCtrl.setRoot(HomePage);
  }
}
