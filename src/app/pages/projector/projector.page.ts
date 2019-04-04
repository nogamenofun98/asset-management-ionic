import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {ModalController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-projector',
    templateUrl: './projector.page.html',
    styleUrls: ['./projector.page.scss'],
})


export class ProjectorPage implements OnInit {
    public searchString: string;
    public projectors: any;
    private headers: HttpHeaders;
    private token: string;
    // public isAdd = false;
    // @ViewChildren('formAdd') formAdd: ElementRef;

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
        // this.getAllProjectors();
    }

    ionViewWillEnter() {
        this.projectors = null;
        this.getAllProjectors();
    }

    fakeCount(count: number) {
        return Array(count);
    }

    getAllProjectors() {
        console.log('getting all projectors');
        return this.http.get(this.env.API_URL + 'projectors', {headers: this.headers})
            .subscribe(data => {
                // console.log(data[0].data);
                this.projectors = data[0].data;
            }, error => {
                console.log(error);
            }, () => {
                console.log('completed');
            });
    }

    search() {
        console.log('search: ' + this.searchString);
    }

    selectProjector(projectorID: any) {
        // console.log('selected');
        // console.log(projector);
        this.router.navigate(['/projectors/', projectorID]);
    }

    create() {
        console.log('create button clicked');
        // this.isAdd = true;
        this.showCreate();
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateProjectorPage,
            componentProps: {
                'modalController': this.modalController,
            }
        });
        createModal.onDidDismiss().then((isOk) => {
            if (isOk.data) {
                this.getAllProjectors();
            }
        });
        return await createModal.present();
    }
}

@Component({
    selector: 'app-create',
    templateUrl: './create.projector.page.html',
})
export class CreateProjectorPage {
    isLoading: boolean;
    private modalController: ModalController;
    private loadingObject: any;
    private token: any;
    private headers: HttpHeaders;

    constructor(modalController: ModalController,
                private alertService: AlertService,
                private authService: AuthService,
                private http: HttpClient,
                private env: EnvService,
    ) {
        this.modalController = modalController;
        this.token = this.authService.token;
        this.headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
        });
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: NgForm) {
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
        });
        if (!this.isLoading) {
            this.isLoading = true;
            return this.http.post(this.env.API_URL + 'projectors/',
                {
                    projector_label: form.value.label,
                    model: form.value.model,
                    serial_number: form.value.serial,
                    lamp_hour: form.value.hour
                }, {headers: this.headers}
            ).subscribe(message => {
                // console.log(message);
                this.isLoading = false;
                console.log(message);
                this.alertService.presentToast(message['message'], 'success', 1500, false);
                this.loadingObject.dismiss();
                this.modalController.dismiss(true);
            }, error => {
                // console.log(error);
                this.isLoading = false;
                // console.log(error);
                let messages = '';
                messages += error.error.message + ', ';
                const error_lists = error.error.errors;
                Object.keys(error_lists).forEach(function (key) {
                    error_lists[key].forEach((value) => {
                        messages += value + ', ';
                    });
                });
                this.alertService.presentToast(messages, 'danger', 1500, false);
                this.loadingObject.dismiss();
                this.modalController.dismiss(false);
            }, () => {
                console.log('completed');
            });
        }

    }
}
