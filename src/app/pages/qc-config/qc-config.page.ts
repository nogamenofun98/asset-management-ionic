import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {ActionSheetController, AlertController, ModalController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-qc-config',
    templateUrl: './qc-config.page.html',
    styleUrls: ['./qc-config.page.scss'],
})


export class QcConfigPage implements OnInit {
    public searchString: string;
    public qc_configs: any;
    private headers: HttpHeaders;
    private token: string;

    constructor(private http: HttpClient,
                private modalController: ModalController,
                private router: Router,
                private navCtrl: NavController,
                private env: EnvService,
                private authService: AuthService,
    ) {
        this.token = this.authService.token;
        this.headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });
    }

    ngOnInit() {
        // this.getAllQc_configs();
    }

    ionViewWillEnter() {
        this.qc_configs = null;
        this.getAllQc_configs();
    }

    fakeCount(count: number) {
        return Array(count);
    }

    getAllQc_configs() {
        console.log('getting all qc_configs');
        return this.http.get(this.env.API_URL + 'qc_configures', {headers: this.headers})
            .subscribe(data => {
                // console.log(data[0]);
                this.qc_configs = data[0];
            }, error => {
                console.log(error);
            }, () => {
                console.log('completed');
            });
    }

    search() {
        console.log('search: ' + this.searchString);
    }

    selectQc_config(qc_configID: any) {
        // console.log('selected');
        // console.log(qc_config);
        this.router.navigate(['/qc_configure/', qc_configID]);
    }

    create() {
        console.log('create button clicked');
        // this.isAdd = true;
        this.showCreate();
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateQCConfigPage,
            componentProps: {
                'modalController': this.modalController,
            }
        });
        createModal.onDidDismiss().then((isOk) => {
            if (isOk.data) {
                this.getAllQc_configs();
            }
        });
        return await createModal.present();
    }
}

@Component({
    selector: 'app-create-qc',
    templateUrl: './create.qc-config.page.html',
})
export class CreateQCConfigPage {
    isLoading: boolean;
    public form: FormGroup;
    public appCreateQC = this;
    unsubcribe: any;
    public fields: any[] = [];
    private modalController: ModalController;
    private loadingObject: any;
    private token: any;
    private headers: HttpHeaders;
    testObservable: Observable<any[]>;

    constructor(modalController: ModalController,
                private alertService: AlertService,
                private authService: AuthService,
                private http: HttpClient,
                private env: EnvService,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
    ) {
        this.modalController = modalController;
        this.token = this.authService.token;
        this.headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });

        this.form = new FormGroup({
            fields: new FormControl(JSON.stringify(this.fields))
        });
        this.unsubcribe = this.form.valueChanges.subscribe((update) => {
            // console.log(update);
            this.fields = JSON.parse(update.fields);
        });
        if (!this.testObservable) {
            this.testObservable = new Observable<any[]>(test => {
                test.next(this.fields);
            });
        }
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: NgForm) {
        // this.alertService.presentLoading().then(loading => {
        //   this.loadingObject = loading;
        // });
        // if (!this.isLoading) {
        //   this.isLoading = true;
        //   return this.http.post(this.env.API_URL + 'qc_configures/',
        //       {
        //         qc_config_label: form.value.label,
        //         model: form.value.model,
        //         serial_number: form.value.serial,
        //         lamp_hour: form.value.hour
        //       }, {headers: this.headers}
        //   ).subscribe(message => {
        //     // console.log(message);
        //     this.isLoading = false;
        //     console.log(message);
        //     this.alertService.presentToast(message['message'], 'success', 1500, false);
        //     this.loadingObject.dismiss();
        //     this.modalController.dismiss(true);
        //   }, error => {
        //     // console.log(error);
        //     this.isLoading = false;
        //     // console.log(error);
        //     let messages = '';
        //     messages += error.error.message + ', ';
        //     const error_lists = error.error.errors;
        //     Object.keys(error_lists).forEach(function (key) {
        //       error_lists[key].forEach((value) => {
        //         messages += value + ', ';
        //       });
        //     });
        //     this.alertService.presentToast(messages, 'danger', 1500, false);
        //     this.loadingObject.dismiss();
        //     this.modalController.dismiss(false);
        //   }, () => {
        console.log('form completed');
        //   });
        // }

    }


    showInput() {
        console.log('showinpit click');
    }

    onUpload(e) {
        console.log(e);
    }

    getFields() {
        return this.fields;
    }

    ngDistroy() {
        this.unsubcribe();
    }

    async openAddFieldAction(ev: any) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            buttons: [
                {
                    text: 'Text Field',
                    icon: 'add',
                    handler: () => {
                        this.promptAddField('text');
                    }
                },
                {
                    text: 'Radio Button',
                    icon: 'add',
                    handler: () => {
                        this.promptAddField('radio');
                    }
                },
                {
                    text: 'Dropdown',
                    icon: 'add',
                    handler: () => {
                        this.promptAddField('dropdown');
                    }
                },
                {
                    text: 'Checkbox',
                    icon: 'add',
                    handler: () => {
                        this.promptAddField('checkbox');
                    }
                },
            ],
        });
        await actionSheet.present();
    }

    promptAddField(field: string) {
        // console.log(field);
        this.presentAlertPrompt(field);
    }

    async presentAlertPrompt(field: string) {
        let inputs = [];
        switch (field) {
            case 'text':
                inputs = [{
                    name: 'field_name',
                    type: 'text',
                    placeholder: 'Name for the field'
                },
                    {
                        name: 'field_label',
                        type: 'text',
                        placeholder: 'Label for the field'
                    },
                    {
                        name: 'field_required',
                        type: 'text',
                        placeholder: 'Ex: 1 = true, 0 = false',
                    },
                ];
                break;
            case 'radio':
            case 'checkbox':
            case 'dropdown':
                inputs = [{
                    name: 'field_name',
                    type: 'text',
                    placeholder: 'Name for the field'
                },
                    {
                        name: 'field_label',
                        type: 'text',
                        placeholder: 'Label for the field'
                    },
                    {
                        name: 'field_options',
                        type: 'text',
                        placeholder: 'Options (Ex: key:label,key:label,...)'
                    },
                    {
                        name: 'field_required',
                        type: 'text',
                        placeholder: 'Ex: 1 = true, 0 = false',
                    },
                ];
                break;
        }
        const alert = await this.alertController.create({
            header: 'Prompt!',
            inputs: inputs,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        // console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        /*
                        * field_label: ""
                            field_name: ""
                            field_required: ""*/
                        if (!data.field_label) {
                            return;
                        }
                        if (!data.field_name) {
                            return;
                        }
                        if (!data.field_required) {
                            return;
                        }
                        console.log('Confirm Ok');
                        // console.log(data);
                        this.addFieldToFields(data, field);

                    }
                }
            ]
        });

        await alert.present();
    }

    addFieldToFields(field: any, type: string) {
        // add object into fields list
        let obj = null;
        if (type === 'text') {
            obj = {
                type: type,
                name: field.field_name,
                label: field.field_label,
                required: (field.field_required === '' || field.field_required === 0) ? 0 : 1,
                value: '',
            };
        } else {
            // split using "," to get each option, then split again with : to get key and label
            const options = field.field_options.split(',');
            const optionsArray = [];
            let keyLabel = null;
            options.forEach(option => {
                keyLabel = option.split(':');
                const temp = {
                    key: keyLabel[0],
                    label: keyLabel[1],
                };
                optionsArray.push(temp);
            });
            obj = {
                type: type,
                name: field.field_name,
                label: field.field_label,
                required: (field.field_required === '' || field.field_required === 0) ? 0 : 1,
                value: '',
                options: optionsArray
            };
        }
        // console.log(obj);
        this.fields.push(obj);
        this.form = new FormGroup({
            fields: new FormControl(JSON.stringify(this.fields))
        });
        // console.log(this.fields);
    }

    // remove field is in dynamic form components
}
