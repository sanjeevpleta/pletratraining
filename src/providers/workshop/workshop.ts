//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { workshop } from '../../interface/workshop';
import firebase from 'firebase';

@Injectable()
export class WorkshopProvider {

    public WorkshopList: firebase.database.Reference;
    constructor() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.WorkshopList = firebase.database().ref('workshop');
                console.log('workshop list : ' + this.WorkshopList);
            }
        });
    }

  addWorkshop(workshopData: workshop): Promise<any> {
      var newWorkshopKey = firebase.database().ref().child(`workshop`).push().key;

      var updates = {};
      updates['/workshop/' + newWorkshopKey] = workshopData;

      return firebase.database().ref().update(updates);
  }

  //CreateWorkShop(workshopData: workshop): firebase.database.ThenableReference {
  //    return this.WorkshopList.push(workshopData);
  //}
  CreateWorkShop(eventCost: number, eventDuration: string,eventDate: Date, eventLocation: string, eventType: string): firebase.database.ThenableReference {
      return this.WorkshopList.push({
          cost: eventCost,
          startDate: eventDate,
          location: eventLocation,
          duration: eventDuration,
          eventType: eventType
      });
  
  }

  updateWorkshop(workshopData: workshop): Promise<any> {
      var updates = {};
      updates['/workshop/' + workshopData.key] = workshopData;

      return firebase.database().ref().update(updates);
  }

  get(): firebase.database.Reference {
      return this.WorkshopList;
  }

  getById(key: string): firebase.database.Reference {
      return this.WorkshopList.child(key);
  }

}
