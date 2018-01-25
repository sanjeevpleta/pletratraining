import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuPage} from '../menu/menu';

/**
 * Generated class for the MenulistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menulist',
  templateUrl: 'menulist.html',
})
export class MenulistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

 }

 gotoMenuList(){
    console.log('menulist');
    this.navCtrl.push('MenuPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenulistPage');
  }

}
