import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var cordova: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  isReady = false;
  initErr = '';
  sodyoErr = '';
  immediateData = '';
  scannerErr = '';
  sodyoEvent = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      cordova.plugins.SodyoSDK.init(
        'APP KEY',
        () => {
          this.isReady = true;
        },
        (err) => {
          this.initErr = err;
        }
      );

      cordova.plugins.SodyoSDK.setUserInfo({ userName: 'Donald' });
      cordova.plugins.SodyoSDK.setAppUserId('123');
      cordova.plugins.SodyoSDK.setCustomAdLabel('label1,label2,label3');
      cordova.plugins.SodyoSDK.setOverlayView('<a href="sodyosdk://handleCloseSodyoScanner">Close</a>');
      cordova.plugins.SodyoSDK.setOverlayCallback('handleCloseSodyoScanner', this.handleCloseSodyoScanner);
      cordova.plugins.SodyoSDK.setSodyoEventListener((eventName, eventData) => {
        this.sodyoEvent = JSON.stringify(eventData);
      });

      cordova.plugins.SodyoSDK.setErrorListener(
        (err) => {
          this.sodyoErr = err;
        },
      );
    });
  }

  handleClick() {
    cordova.plugins.SodyoSDK.start(
      (immediateData) => {
        this.immediateData = immediateData;
        cordova.plugins.SodyoSDK.close();
      },
      (err) => {
        this.scannerErr = err;
      });
  }

  handleCloseSodyoScanner() {
    cordova.plugins.SodyoSDK.close();
  }
}
