import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, NgForm, NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.page.html',
    styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
    isLoading = false;
    public isErrorOnInput = false;
    private token: string;
    private password_field: FormControl;
    private repeat_password_field: FormControl;
    private loadingObject: any;

    // will put on frontend as the trick to remove fluctuating ngif

    constructor(private route: ActivatedRoute, private authService: AuthService,
                private navCtrl: NavController,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => { // queryParamMap : /reset?token, ParamMap: /reset/:token
            this.token = params.get('token');
        });
    }

    reset(form: NgForm) {
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
        });
        if (!this.isLoading) {
            this.isLoading = true;
            this.authService.reset(this.token, form.value.email, form.value.password, form.value.repeat_password).subscribe(
                data => {
                    this.isLoading = false;
                    this.alertService.presentToast(data['message'], 'success').then(toast => {
                        // console.log(toast);
                        this.bindToastDismissEvent(toast);
                    });
                    this.loadingObject.dismiss();
                }, error => {
                    this.isLoading = false;
                    let messages = '';
                    messages += (error.error.message !== undefined ? error.error.message : error.error.error) + ', ';
                    const error_lists = error.error.errors;
                    if (error.error.errors) {
                        Object.keys(error_lists).forEach(function (key) {
                            error_lists[key].forEach((value) => {
                                messages += value + ', ';
                            });
                        });
                    }
                    this.alertService.presentToast(messages, 'danger', 0, true).then(toast => {
                        // console.log(toast);
                        this.bindToastDismissEvent(toast, false);
                    });
                    this.loadingObject.dismiss();
                }, () => {
                });
        }
    }

    checkPwd(password: NgModel, repeat_password: NgModel, $event: Event) {
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

    bindToastDismissEvent(toast: any, isOK: boolean = true) {
        toast.onDidDismiss().then(() => {
            if (isOK) {
                this.navCtrl.navigateRoot('/');
            }
        });
    }

}
