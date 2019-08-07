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
  immediateData = '';
  scannerErr = '';

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
        'API KEY',
        () => {
          this.isReady = true;
        },
        (err) => {
          this.initErr = err;
        }
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
}
