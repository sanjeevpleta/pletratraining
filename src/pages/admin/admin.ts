import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTrainingPage } from '../add-training/add-training';
import {RegisteredstudentPage} from '../registeredstudent/registeredstudent';
/*
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  addTraining(): void {
        this.navCtrl.push(AddTrainingPage);
    }
  registeredstudent():void{
     this.navCtrl.push(RegisteredstudentPage);
  }
}
