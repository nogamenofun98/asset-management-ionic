import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../../../services/env.service';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../services/alert.service';

@Component({
    selector: 'app-view-projector',
    templateUrl: './view-projector.page.html',
    styleUrls: ['./view-projector.page.scss'],
})
export class ViewProjectorPage implements OnInit {
    public projector: any;
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
        this.getProjectors();
    }

    getProjectors() {
        this.projector = null;
        // console.log('id in method: ' + this.id);
        return this.http.get(this.env.API_URL + 'projectors/' + this.id, {headers: this.headers})
            .subscribe(data => {
                // console.log(data);
                this.projector = data['data'];
            }, error => {
                console.log(error);
                this.alertService.presentToast(error.error.error, 'danger');
                this.navCtrl.navigateBack('/projectors');
            }, () => {
                console.log('completed');
            });
    }

    async showMenu(projector_id: number) {
        let button = [];
        if (!this.isEdit) {
            button = [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.delete(projector_id);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.edit(projector_id);
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
                        this.delete(projector_id);
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

    edit(projector_id: number) {
        this.isEdit = true;
        console.log('edit clicked');
        this.editForm = this.formBuilder.group({
            label: new FormControl(this.projector.projector_label, Validators.compose([Validators.required, Validators.minLength(5)])),
            model: new FormControl(this.projector.model, Validators.compose([Validators.required])),
            serial: new FormControl(this.projector.serial_number, Validators.compose([Validators.required])),
            hour: new FormControl(this.projector.lamp_hour, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
        });
    }

    updateForm() {
        console.log('update');
        return this.http.post(this.env.API_URL + 'projectors/' + this.projector.id,
            {
                _method: 'PUT',
                projector_label: this.editForm.get('label').value,
                model: this.editForm.get('model').value,
                serial_number: this.editForm.get('serial').value,
                lamp_hour: this.editForm.get('hour').value
            }, {headers: this.headers}
        ).subscribe(message => {
            // console.log(message);
            this.alertService.presentToast(message['message'], 'success', 1500, false);
            this.isEdit = false;
            this.getProjectors();
        }, error => {
            // console.log(error);
            this.alertService.presentToast(error, 'danger', 1500, false);
        }, () => {
            console.log('completed');
        });

    }

    async delete(projector_id: number) {
        console.log('confirm showed');
        let result = '';
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then((data => {
                // console.log(data);
                result = data.role;
                if (result === 'success') {
                    return this.http.post(this.env.API_URL + 'projectors/' + projector_id,
                        {_method: 'DELETE'}, {headers: this.headers}
                    ).subscribe(message => {
                        // console.log(message);
                        this.alertService.presentToast(message['message'], 'success', 1500, false);
                        this.navCtrl.navigateBack('/projectors');
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
