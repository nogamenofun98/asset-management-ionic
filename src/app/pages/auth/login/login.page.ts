import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {RegisterPage} from '../register/register.page';
import {NgForm} from '@angular/forms';
import {ForgotPage} from '../forgot/forgot.page';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // login_data: any = {};
    isLoading = false;
    private loadingObject: any;

    constructor(private modalController: ModalController,
                private authService: AuthService,
                private navCtrl: NavController,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    dismissLogin() {
        this.modalController.dismiss();
    }

    // On Register button tap, dismiss login modal and open register modal
    async registerModal() {
        // this.dismissLogin();
        const registerModal = await this.modalController.create({
            component: RegisterPage,
            componentProps: {'login': LoginPage}
        });
        return await registerModal.present();
    }

    login(form: NgForm) {
        // console.log('bool: ' + (form.value.remember_me === ''));
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
        });
        if (!this.isLoading) {
            this.isLoading = true;
            this.authService.login(form.value.email, form.value.password, (form.value.remember_me === '')).subscribe(
                data => {
                    // console.log(data);
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.alertService.presentToast('Logged in successfully!', 'success');
                },
                error => {
                    console.log(error);
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.alertService.presentToast('Username / Password wrong!', 'danger');
                },
                () => {
                    // this.dismissLogin();
                    this.navCtrl.navigateRoot('/dashboard');
                }
            );
        }

    }

    async forgotModal() {
        // this.dismissLogin();
        const forgotModal = await this.modalController.create({
            component: ForgotPage,
            componentProps: {'login': LoginPage}
        });
        return await forgotModal.present();
    }

}
