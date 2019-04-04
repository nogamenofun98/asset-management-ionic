import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {FormControl, NgForm, NgModel} from '@angular/forms';

// import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    isLoading: boolean;
    public isErrorOnInput = false;
    // loginPage: any;
    private password_field: FormControl;
    private repeat_password_field: FormControl;
    private loadingObject: any;

    constructor(private modalController: ModalController,
                private authService: AuthService,
                private navCtrl: NavController,
                // private navParams: NavParams,
                private alertService: AlertService) {
        // console.log('in constructor');
        // console.log(this.navParams);
        // this.loginPage = this.navParams.get('login');
        // avoid circular dependency which i dont know
        // also why that cant, but by passing login to here can work
    }

    ngOnInit() {
    }

    // Dismiss Register Modal
    dismissRegister() {
        this.modalController.dismiss();
    }

    // On Login button tap, dismiss Register modal and open login Modal
    async loginModal() {
        this.dismissRegister();
        // console.log('in loginmodal');
        // console.log(this.loginPage);
        // const loginModal = await this.modalController.create({
        //     component: this.loginPage,
        // });
        // return await loginModal.present();
    }

    register(form: NgForm) {
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
        });
        if (!this.isLoading) {
            this.isLoading = true;
            this.authService.register(form.value.name, form.value.email, form.value.password).subscribe(
                data => {
                    this.dismissRegister();
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.navCtrl.navigateRoot('/dashboard');
                    this.alertService.presentToast('Register successfully, logging you in...', 'success');
                },
                error => {
                    // console.log(error);
                    this.isLoading = false;
                    this.loadingObject.dismiss();
                    let messages = '';
                    messages += error.error.message + ', ';
                    const error_lists = error.error.errors;
                    Object.keys(error_lists).forEach(function (key) {
                        error_lists[key].forEach((value) => {
                            messages += value + ', ';
                        });
                    });
                    this.alertService.presentToast(messages, 'danger');
                },
                () => {

                }
            );
        }
    }

    checkPwd(password: NgModel, repeat_password: NgModel) {
        this.password_field = password.control;
        this.repeat_password_field = repeat_password.control;
        if (!this.password_field || !this.repeat_password_field) {
            return null;
        }
        // // return null if another validator has already found an error on the matchingControl
        if (this.repeat_password_field.errors !== null) {
            if (this.repeat_password_field.errors.required) {
                return null;
            }
        }
        if (password.value !== repeat_password.value) {
            this.isErrorOnInput = true;
            this.repeat_password_field.setErrors({matchError: true});
        } else {
            this.isErrorOnInput = false;
            this.repeat_password_field.setErrors(null);
        }
    }
}
