import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import firebase from 'firebase';

@Injectable()
export class EmailProvider {
    public emailList: firebase.database.Reference;

    constructor(private _EMAIL: EmailComposer) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.emailList = firebase.database().ref('emailmessage');
                console.log('emailmessage = ' + this.emailList);
            }
        });
    }

    addEmailMessage(): void {
        if (this.emailList.child.length == 0) {
            this.emailList.push({
                message: 'Bank name: State bank of India Bank account name: Pletratech Pvt ltd. Account number: 000023452345 IFSC: SBIN0002345'
            });
        }
    }

    getMessage(): firebase.database.Reference {
        return this.emailList;
    }

    sendEmail(to: string,
        cc: string,
        bcc: string,
        attachment: string,
        subject: string,
        body: string): void {
        // Use the plugin isAvailable method to check whether
        // the user has configured an email account
        this._EMAIL.isAvailable()
            .then((available: boolean) => {

                // Check that plugin has been granted access permissions to 
                // user's e-mail account
                this._EMAIL.hasPermission()
                    .then((isPermitted: boolean) => {

                        // Define an object containing the 
                        // keys/values for populating the device 
                        // default mail fields when a new message 
                        // is created
                        let email: any = {
                            app: 'mailto',
                            to: to,
                            cc: cc,
                            bcc: bcc,
                            attachments: [
                                attachment
                            ],
                            subject: subject,
                            body: body
                        };

                        // Open the device e-mail client and create 
                        // a new e-mail message populated with the 
                        // object containing our message data
                        this._EMAIL.open(email);
                    })
                    .catch((error: any) => {
                        console.log('No access permission granted');
                        console.dir(error);
                    });
            })
            .catch((error: any) => {
                console.log('User does not appear to have device e-mail account');
                console.dir(error);
            });
    }

}