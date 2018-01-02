import { Component } from '@angular/core';
import {
    Alert,
    AlertController,
    IonicPage,
    NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    public resetPasswordForm: FormGroup;
    constructor(public navCtrl: NavController,
        public authProvider: AuthProvider,
        public alertCtrl: AlertController,
        formBuilder: FormBuilder) {
        this.resetPasswordForm = formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ]
        });
    }

    resetPassword(): void {
        if (!this.resetPasswordForm.valid) {
            console.log(
                `Need to complete the form, current value: ${this.resetPasswordForm.value}`
            );
        } else {
            const email: string = this.resetPasswordForm.value.email;
            this.authProvider.resetPassword(email).then(function () {
                this.sendAlert("An email has been sent.");
            }).catch(function (error) {
                this.sendAlert(error.message);
            });
        }
    }
    sendAlert(message: string): void {
        const alert: Alert = this.alertCtrl.create({
            message: message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
