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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
