import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { Navbar } from '@ionic/angular'; // import navbar for editing

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // @ViewChild(Navbar) navBar: Navbar;
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


  RegisterUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value).then(data => { // authenticate with firebase
      console.log('got data', data);
      this.alert('Registered!');
    })
      .catch(error => {
        console.log('got an error ', error);
        this.alert(error.message);
      });
    console.log('Would register user with ', this.user.value, this.password.value);
  }

}

