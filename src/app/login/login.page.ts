import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(private alertctrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController) {
  }

  alert(message: string) {
    this.alertctrl.create({
      header: 'Info!',
      subHeader: message,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  signInUser() {
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)  // Sample App Slider Demo, Firebase authentication
      .then(data => {
        console.log('got some data', this.fire.auth.currentUser.email);
        this.alert('Welcome. You\'re logged in');
        this.navCtrl.navigateRoot('/tabs');
      })
      .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      });

    console.log('Would sign in with ', this.user.value, this.password.value);
  }
  push() {
    this.navCtrl.navigateForward('/register');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
