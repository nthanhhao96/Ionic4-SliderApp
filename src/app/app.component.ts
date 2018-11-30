import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from 'angularfire2/firestore'; // Slider Demo, Sample App, firebase dependencies
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  items: Observable<any[]>;
  public pages = [
    { title: 'Home', icon: 'home', url: '/home' },
    { title: 'Custom places', icon: 'add-circle', url: '/contact' },
    { title: 'About', url: '/about' },
  ];
  constructor(
    db: AngularFirestore,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.items = db.collection('items').valueChanges();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
