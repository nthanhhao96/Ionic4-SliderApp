import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  // Slider Demo, Sample App, Main code part for To do list

  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth) {
    this.itemsRef = db.list(this.fire.auth.currentUser.uid);

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addItem(newName: string, newNum: number) {
    const myObj = {
      'Name': newName,
      'Zone': newNum
    };
    // this.itemsRef.push({ text: newName });
    this.itemsRef.push({ myObj });
  }
  updateItem(key: string, newName: string, newNum: number) {
    const myObj = {
      'Name': newName,
      'Zone': newNum
    };
    // this.itemsRef.update(key, { Name: newText, Zone: newNum });
    this.itemsRef.update(key, { myObj });

  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
    console.log(this.fire.auth.currentUser.email);
  }

}

