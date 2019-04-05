import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AlertService} from '../../services/alert.service';

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
    selector: 'app-create',
    templateUrl: './create.qc-config.page.html',
})
export class CreateQCConfigPage {
    isLoading: boolean;
    public form: FormGroup;
    unsubcribe: any;
    public fields: any[] = [
        {
            type: 'text',
            name: 'firstName',
            label: 'First Name',
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'lastName',
            label: 'Last Name',
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            value: '',
            required: true,
        },

        // {
        //     type: 'file',
        //     name: 'picture',
        //     label: 'Picture',
        //     required: true,
        //     onUpload: this.onUpload.bind(this)
        // },
        {
            type: 'dropdown',
            name: 'country',
            label: 'Country',
            value: 'in',
            required: true,
            options: [
                {key: 'in', label: 'India'},
                {key: 'us', label: 'USA'}
            ]
        },
        {
            type: 'radio',
            name: 'gender',
            label: 'Gender',
            required: true,
            options: [
                {key: 'm', label: 'Male'},
                {key: 'f', label: 'Female'}
            ]
        },
        {
            type: 'checkbox',
            name: 'hobby',
            label: 'Hobby',
            required: true,
            options: [
                {key: 'f', label: 'Fishing'},
                {key: 'c', label: 'Cooking'}
            ]
        }
    ];
    private modalController: ModalController;
    private loadingObject: any;
    private token: any;
    private headers: HttpHeaders;

    constructor(modalController: ModalController,
                private alertService: AlertService,
                private authService: AuthService,
                private http: HttpClient,
                private env: EnvService,
                private popoverController: PopoverController,
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
            console.log(update);
            this.fields = JSON.parse(update.fields);
        });
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
}
