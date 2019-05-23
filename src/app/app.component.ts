import {Component} from '@angular/core';

import {MenuController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import {HttpClient} from '@angular/common/http';
import {EnvService} from './services/env.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'home'
        },
        {
            title: 'Classrooms',
            url: '/classrooms',
            icon: 'cube'
        },
        {
            title: 'Projectors',
            url: '/projectors',
            icon: 'settings'
        },
        {
            title: 'QC Config',
            url: '/qc_configure',
            icon: 'settings'
        },
        // {
        //     title: 'List',
        //     url: '/list',
        //     icon: 'list'
        // },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        public http: HttpClient,
        private env: EnvService, private menu: MenuController
    ) {
        this.initializeApp();
    }

    // ping() {
    //     this.http
    //         .get(this.env.API_URL)
    //         .subscribe(data => console.log(data), err => console.log(err));
    // }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            // this.splashScreen.hide();
            this.authService.getToken();
        });
    }

    logout() {
        this.authService.logout().subscribe(
            data => {
                this.alertService.presentToast(data['message'], 'success');
            },
            error => {
                console.log(error);
            },
            () => {
                this.navCtrl.navigateRoot('/');
            }
        );
    }
}
