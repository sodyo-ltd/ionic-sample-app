import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var cordova: any;

const sodyo = cordova.plugins.SodyoSDK;

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

      sodyo.init(
        'API KEY',
        () => {
          this.isReady = true;
        },
        (err) => {
          this.initErr = err;
        }
      );

      sodyo.setUserInfo({ userName: 'Donald' });
      sodyo.setAppUserId('123');
      sodyo.setCustomAdLabel('label1,label2,label3');
      sodyo.setScannerParams({ Prob_Size: 8 });
      sodyo.setOverlayView('<a href="sodyosdk://handleCloseSodyoScanner">Close</a>');
      sodyo.setOverlayCallback('handleCloseSodyoScanner', this.handleCloseSodyoScanner);

      sodyo.setErrorListener(
        (err) => {
          this.sodyoErr = err;
        },
      );
    });
  }

  handleClick() {
    sodyo.start(
      (immediateData) => {
        this.immediateData = immediateData;
        sodyo.close();
      },
      (err) => {
        this.scannerErr = err;
      });
  }

  handleCloseSodyoScanner() {
    sodyo.close();
  }
}
