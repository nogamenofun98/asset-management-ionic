import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActionSheetController, NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../../../services/env.service';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../services/alert.service';

@Component({
    selector: 'app-view-qc-config',
    templateUrl: './view-qc-config.page.html',
    styleUrls: ['./view-qc-config.page.scss'],
})
export class ViewQcConfigPage implements OnInit {
    public qc_config: any;
    public isMD: any;
    public isEdit = false;
    public editForm: FormGroup;
    private token;
    private headers: HttpHeaders;
    private id: string;

    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private env: EnvService,
                private authService: AuthService,
                private actionSheetController: ActionSheetController,
                private alertService: AlertService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
    ) {
        this.isMD = this.env.isMD;
        this.token = this.authService.token;
        this.headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => { // queryParamMap : /reset?token, ParamMap: /reset/:token
            this.id = params.get('id');
        });
        // console.log('id: ' + this.id);
        this.getQc_configs();
    }

    getQc_configs() {
        this.qc_config = null;
        // console.log('id in method: ' + this.id);
        return this.http.get(this.env.API_URL + 'qc_configures/' + this.id, {headers: this.headers})
            .subscribe(data => {
                // console.log(data);
                this.qc_config = data['data'];
            }, error => {
                console.log(error);
                this.alertService.presentToast(error.error.error, 'danger');
                this.navCtrl.navigateBack('/qc_configure');
            }, () => {
                console.log('completed');
            });
    }

    async showMenu(qc_config_id: number) {
        let button = [];
        if (!this.isEdit) {
            button = [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.delete(qc_config_id);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.edit(qc_config_id);
                    }
                },
            ];
        } else {
            button = [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.delete(qc_config_id);
                    }
                },
                {
                    text: 'Cancel Edit',
                    role: 'destructive',
                    icon: 'close',
                    handler: () => {
                        this.isEdit = false;
                    }
                },
                {
                    text: 'Submit',
                    icon: 'send',
                    handler: () => {
                        this.updateForm();
                    }
                },
            ];
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            buttons: button,
        });
        await actionSheet.present();
    }

    edit(qc_config_id: number) {
        this.isEdit = true;
        console.log('edit clicked');
        // this.editForm = this.formBuilder.group({
        //   label: new FormControl(this.qc_config.qc_config_label, Validators.compose([Validators.required, Validators.minLength(5)])),
        //   model: new FormControl(this.qc_config.model, Validators.compose([Validators.required])),
        //   serial: new FormControl(this.qc_config.serial_number, Validators.compose([Validators.required])),
        //   hour: new FormControl(this.qc_config.lamp_hour, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
        // });
    }

    updateForm() {
        console.log('update');
        // return this.http.post(this.env.API_URL + 'qc_configs/' + this.qc_config.id,
        //     {
        //       _method: 'PUT',
        //       qc_config_label: this.editForm.get('label').value,
        //       model: this.editForm.get('model').value,
        //       serial_number: this.editForm.get('serial').value,
        //       lamp_hour: this.editForm.get('hour').value
        //     }, {headers: this.headers}
        // ).subscribe(message => {
        //   // console.log(message);
        //   this.alertService.presentToast(message['message'], 'success', 1500, false);
        //   this.isEdit = false;
        //   this.getQc_configs();
        // }, error => {
        //   // console.log(error);
        //   this.alertService.presentToast(error, 'danger', 1500, false);
        // }, () => {
        //   console.log('completed');
        // });

    }

    async delete(qc_config_id: number) {
        console.log('confirm showed');
        let result = '';
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then((data => {
                // console.log(data);
                result = data.role;
                if (result === 'success') {
                    return this.http.post(this.env.API_URL + 'qc_configures/' + qc_config_id,
                        {_method: 'DELETE'}, {headers: this.headers}
                    ).subscribe(message => {
                        // console.log(message);
                        this.alertService.presentToast(message['message'], 'success', 1500, false);
                        this.navCtrl.navigateBack('/qc_configure');
                    }, error => {
                        // console.log(error);
                        this.alertService.presentToast(error, 'danger', 1500, false);
                    }, () => {
                        console.log('completed');
                    });
                }
            }));
        });
        // delete is set as post request because laravel cannot recognise the delete, so put id at the link with _method as delete
    }

}
