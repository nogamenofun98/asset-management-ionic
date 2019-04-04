import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    API_URL = 'http://localhost:8000/api/';
    isMD = (this.platform.is('mobile') || this.platform.is('mobileweb'));

    constructor(private platform: Platform) {
    }
}
