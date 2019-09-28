import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { AngularFireAuthModule } from '@angular/fire/auth';
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}

@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css'],
  providers: [ WindowService]
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(private win: WindowService) { }

  ngOnInit() {

const firebaseConfig = {
   apiKey: "your apikey",
    authDomain: "your authdomain",
    databaseURL: "your database url",
    projectId: "your projectid",
    storageBucket: "your storage bucket",
    messagingSenderId: "your message sender id",
    appId: "your api id"
};

/* on DOM ready */
// $(function() {

//     app = firebase.initializeApp(firebaseConfig);

//     /* check in here, if it had been loaded properly */
// });
    firebase.initializeApp(firebaseConfig);
    // Firebase App.initializeApp()
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
   // firebase.initializeApp(environment.firebase)
    // const new_fire = firebase.initializeApp(environment.firebase);
    this.windowRef.recaptchaVerifier
                  .render()
                  .then( widgetId => {

                    this.windowRef.recaptchaWidgetId = widgetId
    });
  }
  // this.windowRef = this.win.nativeWindow
  //     firebase.initializeApp(environment.firebase)
  //     this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  //     this.windowRef.recaptchaVerifier.render()

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth()
            .signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }



}