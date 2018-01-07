import { Component } from '@angular/core';
import {
    Alert,
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
//import { HomePage } from '../home/home';
//import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    public signupForm: FormGroup;
    public loading: Loading;

    constructor(public navCtrl: NavController,
        public authProvider: AuthProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        formBuilder: FormBuilder) {
        this.signupForm = formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            password: [
                '',
                Validators.compose([Validators.minLength(6), Validators.required])
            ],
            firstName: [
                '',
                Validators.compose([Validators.required])
            ],
            lastName: [
                '',
                Validators.compose([Validators.required])
            ],
            mobileNumber: [
                '',
                Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])
            ]
        });
    }

    signupUser(): void {
        if (!this.signupForm.valid) {
            console.log(
                `Need to complete the form, current value: ${this.signupForm.value}`
            );
        } else {
            const email: string = this.signupForm.value.email;
            const password: string = this.signupForm.value.password;
            const firstname: string = this.signupForm.value.firstName;
            const lastname: string = this.signupForm.value.lastName;
            const mobilenumber: string = this.signupForm.value.mobileNumber;

            this.authProvider.signupUser(email, password, firstname, lastname, mobilenumber).then(
                user => {
                    this.authProvider.sendEmailVerification();
                    this.loading.dismiss().then(() => {
                        const alert: Alert = this.alertCtrl.create({
                            message: 'Please check your email to verify',
                            buttons: [{ text: 'Ok', role: 'cancel' }]
                        });
                        alert.present();
                        this.navCtrl.setRoot('LoginPage');
                    });
                },
                error => {
                    this.loading.dismiss().then(() => {
                        const alert: Alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [{ text: 'Ok', role: 'cancel' }]
                        });
                        alert.present();
                    });
                }
            );
            
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
