import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})

export class ForgotPage implements OnInit {
    loginPage: any;
    isLoading: boolean;
    private loadingObject: any;

    constructor(private modalController: ModalController,
                private authService: AuthService,
                private navCtrl: NavController,
                private navParams: NavParams,
                private alertService: AlertService) {
        this.loginPage = this.navParams.get('login');
    }

    ngOnInit() {
    }

    // ionToastDidDismiss(event: Event) {
    //     console.log('toast did dismiss');
    //     console.log(event);
    // }

    async loginModal() {
        this.dismissForgot();
        // console.log('in loginmodal');
        // console.log(this.loginPage);
        // const loginModal = await this.modalController.create({
        //     component: this.loginPage,
        // });
        // return await loginModal.present();
    }

    dismissForgot() {
        this.modalController.dismiss();
    }

    forgot(form: NgForm) {
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
        });
        if (!this.isLoading) {
            this.isLoading = true;
            this.authService.forgot(form.value.email).pipe().subscribe(
                data => {
                    console.log(data);
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.alertService.presentToast(data['message'], 'success').then(toast => {
                        // console.log(toast);
                        this.bindToastDismissEvent(toast);
                    });
                },
                error => {
                    // console.log(error);
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.alertService.presentToast('Email not existed!', 'danger').then(toast => {
                        // console.log(toast);
                        this.bindToastDismissEvent(toast, false);
                    });

                },
                () => {
                    // this.dismissForgot();
                    // this.navCtrl.navigateRoot('/landing');
                }
            );
        } else {
            // do nothing, becoz request havent completed
        }

    }

    bindToastDismissEvent(toast: any, isOK: boolean = true) {
        toast.onDidDismiss().then(() => {
            if (isOK) {
                this.dismissForgot();
                this.navCtrl.navigateRoot('/landing');
            }
        });
    }
}
