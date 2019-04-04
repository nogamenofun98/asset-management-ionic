import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPage} from '../auth/login/login.page';
import {RegisterPage} from '../auth/register/register.page';
import {ForgotPage} from '../auth/forgot/forgot.page';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [LoginPage, RegisterPage, ForgotPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [LoginPage, RegisterPage, ForgotPage],
    entryComponents: [LoginPage, RegisterPage, ForgotPage],
})
export class SharedModulesModule {
}
