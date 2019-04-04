import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController, NavController, Platform} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {RegisterPage} from '../auth/register/register.page';
import {LoginPage} from '../auth/login/login.page';
import {EnvService} from '../../services/env.service';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    public unsubscribeBackEvent: any;

    constructor(
        private modalController: ModalController,
        private menu: MenuController,
        private authService: AuthService,
        private navCtrl: NavController,
        private env: EnvService,
        private platform: Platform,
    ) {
        this.menu.enable(false);
    }

    ngOnInit() {
        // this.initializeBackButtonCustomHandler();
    }

    // // Called when view is left
    // ionViewWillLeave() {
    //     // Unregister the custom back button action for this page
    //     if (this.unsubscribeBackEvent != null) {
    //         this.unsubscribeBackEvent();
    //     }
    // }
    //
    // initializeBackButtonCustomHandler(): void {
    //     this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999, () => {
    //         alert('back pressed home' + this.constructor.name);
    //         navigator['app'].exitApp();
    //     });
    // }

    ionViewWillEnter() {
        this.authService.getToken().then(() => {
            if (this.authService.isLoggedIn) {
                this.navCtrl.navigateRoot('/dashboard');
            }
        });
    }

    async register() {
        const registerModal = await this.modalController.create({
            component: RegisterPage,
        });
        return await registerModal.present();
    }

    async login() {
        const loginModal = await this.modalController.create({
            component: LoginPage,
        });
        return await loginModal.present();
    }
}
