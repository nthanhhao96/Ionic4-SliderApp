import { Component } from '@angular/core';
import { Time } from '@angular/common';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  myZone: number;
  selectedZone: number;
  mySelection: any;
  myOptions: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  userOptions: any;

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth) {
    this.myZone = 0;
    this.selectedZone = this.currentTimeZone();

    this.itemsRef = db.list(this.fire.auth.currentUser.uid);

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.mySelection = {
      kind: 'EET - Eastern European Time GMT+2:00'
    };

    this.myOptions = [
      // {Name: 'Testi', Zone:1},
      // {Name: 'Testi2', Zone:2}
    ];

    this.addAllPlaces(this.myOptions); // add predetermined places
    this.addUserPlaces(this.myOptions);
    // this.combinePlaces(this.myOptions, this.userOptions);

  }


  addNewPlace(myPlaces: any[], myName: string, myZone: number) {
    myPlaces.push({ Name: myName, Zone: myZone });

  }
  addUserPlaces(myPlaces: any[]) { // function for adding user time zones to the list

    this.itemsRef.query.on('child_added', function (snapshot) {

      const userPlace = snapshot.child('myObj/Name').val();
      const userZone = snapshot.child('myObj/Zone').val();
      console.log(userPlace + '|' + userZone);

      // this.userOptions.push ({Name: userPlace, Zone:userZone});
      try {
        // this.addNewPlace(myPlaces, userPlace, userZone);
        myPlaces.push({ Name: userPlace, Zone: userZone });
      } catch (err) {
        console.log(err);
      }
      // this.userData.push ({Name: userPlace, Zone:userZone});
    });


  }
  addAllPlaces(myPlaces: any[]) { // function for adding premade time zones to the list
    this.addNewPlace(myPlaces, 'GMT - Greenwich Mean Time GMT+0:00', 0);
    this.addNewPlace(myPlaces, 'UTC - Universal Coordinated Time GMT+0:00', 0);
    this.addNewPlace(myPlaces, 'ECT - European Central Time GMT+1:00', 1);
    this.addNewPlace(myPlaces, 'EET - Eastern European Time GMT+2:00', 2);
    this.addNewPlace(myPlaces, 'ART - Egypt Standard Time GMT+2:00', 2);
    this.addNewPlace(myPlaces, 'EAT - Eastern African Time GMT+3:00', 3);
    this.addNewPlace(myPlaces, 'MET - Middle East Time GMT+3:30', 3.5);
    this.addNewPlace(myPlaces, 'NET - Near East Time GMT+4:00', 4);
    this.addNewPlace(myPlaces, 'PLT - Pakistan Lahore Time GMT+5:00', 5);
    this.addNewPlace(myPlaces, 'IST - India Standard Time GMT+5:30', 5.5);
    this.addNewPlace(myPlaces, 'BST - Bangladesh Standard Time GMT+6:00', 6);
    this.addNewPlace(myPlaces, 'VST - Vietnam Standard Time GMT+7:00', 7);
    this.addNewPlace(myPlaces, 'CTT - China Taiwan Time GMT+8:00', 8);
    this.addNewPlace(myPlaces, 'JST - Japan Standard Time GMT+9:00', 9);
    this.addNewPlace(myPlaces, 'ACT - Australia Central Time GMT+9:30', 9.5);
    this.addNewPlace(myPlaces, 'AET - Australia Eastern Time GMT+10:00', 10);
    this.addNewPlace(myPlaces, 'SST - Solomon Standard Time GMT+11:00', 11);
    this.addNewPlace(myPlaces, 'NST - New Zealand Standard Time GMT+12:00', 12);
    this.addNewPlace(myPlaces, 'MIT - Midway Islands Time GMT-11:00', -11);
    this.addNewPlace(myPlaces, 'HST - Hawaii Standard Time GMT-10:00', -10);
    this.addNewPlace(myPlaces, 'AST - Alaska Standard Time GMT-9:00', -9);
    this.addNewPlace(myPlaces, 'PST - Pacific Standard Time GMT-8:00', -8);
    this.addNewPlace(myPlaces, 'PNT - Phoenix Standard Time GMT-7:00', -7);
    this.addNewPlace(myPlaces, 'MST - Mountain Standard Time GMT-7:00', -7);
    this.addNewPlace(myPlaces, 'CST - Central Standard Time GMT-6:00', -6);
    this.addNewPlace(myPlaces, 'EST - Eastern Standard Time GMT-5:00', -5);
    this.addNewPlace(myPlaces, 'PRT - Puerto Rico and US Virgin Islands Time GMT-4:00', -4);
    this.addNewPlace(myPlaces, 'CNT - Canada Newfoundland Time GMT-3:30', -3.5);
    this.addNewPlace(myPlaces, 'AGT - Argentina Standard Time GMT-3:00', -3);
    this.addNewPlace(myPlaces, 'BET - Brazil Eastern Time GMT-3:00', -3);
    this.addNewPlace(myPlaces, 'CAT - Central African Time GMT-1:00', -1);
    // console.log(this.myOptions[0].Name + ': Testi');
  }
  ionViewDidLoad() {

    this.translateName(this.myOptions, this.mySelection.kind); // run once to update to proper time zone.
    console.log('ionViewDidLoad Tab1Page');

  }
  ionViewDidEnter() { // view was entered, rebuild option list
    this.myOptions = [];
    this.addAllPlaces(this.myOptions); // add predetermined places
    this.addUserPlaces(this.myOptions);
  }
  translateName(myPlaces: any[], myName: string) { // probably way to do this with less hassle but I'm tired so sue me.
    for (let i = 0; i < myPlaces.length; i++) {
      if (myName === myPlaces[i].Name) {
        this.myZone = Number(myPlaces[i].Zone);
      }
    }


  }


  currentTime(adjTime: number) { // get current time

    const timeNow = new Date().getTime();
    const myDate = new Date(timeNow + (1000 * 60 * 60 * adjTime));

    return myDate;
  }

  currentTimeZone() { // get current timezone
    const time = this.currentTime(0);
    return time.getTimezoneOffset() / 60;
  }
  /*
selectedCity() {
  const city = 'Espoo'
  return city;
}
*/

  timeHours() { // get hours for the display
    const myTime = this.currentTime(this.myZone + this.selectedZone);
    return myTime.getHours();
  }

  source() { // code for setting moon or sun image based on time

    const hours = this.timeHours();
    if (hours > 7 && hours < 19) {
      const src = '../assets/imgs/decorative_sun.png';
    } else {
      const src = '../assets/imgs/Full_Moon.png';
    }

    // if (hours < 8) serc='..'
    // return src;

  }

  timeZone() { // get current time with time zone adjustments
    const myTime = this.currentTime(this.myZone + this.selectedZone);
    return myTime;
  }



}

