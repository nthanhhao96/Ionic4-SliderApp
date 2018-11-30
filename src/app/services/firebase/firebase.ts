import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: AppModule,
})
export class FirebaseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseProvider Provider');
  }

}
