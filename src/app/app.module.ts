import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';


export function jwtOptionsFactory(storage: Storage) {
    return {
        tokenGetter: () => {
            storage.get('token').then(res => {
                // console.log('token: ' + JSON.stringify(res));
                return res;
            });
        },
        whitelistedDomains: [/^null$/],
    };
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Storage],
            }
        }),
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // NativeStorage,
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
