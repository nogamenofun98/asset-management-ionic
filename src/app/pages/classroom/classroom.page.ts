import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {ModalController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.page.html',
    styleUrls: ['./classroom.page.scss'],
})


export class ClassroomPage implements OnInit {
    public searchString: string;
    public classrooms: any;
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
        // this.getAllClassrooms();
    }

    ionViewWillEnter() {
        this.classrooms = null;
        this.getAllClassrooms();
    }

    fakeCount(count: number) {
        return Array(count);
    }

    getAllClassrooms() {
        console.log('getting all classrooms');
        return this.http.get(this.env.API_URL + 'classrooms', {headers: this.headers})
            .subscribe(data => {
                // console.log(data[0].data);
                this.classrooms = data[0].data;
            }, error => {
                console.log(error);
            }, () => {
                console.log('completed');
            });
    }

    search() {
        console.log('search: ' + this.searchString);
    }

    selectClassroom(classroomID: any) {
        // console.log('selected');
        // console.log(classroom);
        this.router.navigate(['/classrooms/', classroomID]);
    }

    create() {
        console.log('create button clicked');
        // this.isAdd = true;
        this.showCreate();
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateClassroomPage,
            componentProps: {
                'modalController': this.modalController,
            }
        });
        createModal.onDidDismiss().then((isOk) => {
            if (isOk.data) {
                this.getAllClassrooms();
            }
        });
        return await createModal.present();
    }
}

@Component({
    selector: 'app-create-classroom',
    templateUrl: './create.classroom.page.html',
})
export class CreateClassroomPage {
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
            return this.http.post(this.env.API_URL + 'classrooms/',
                {
                    classroom_label: form.value.label,
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
