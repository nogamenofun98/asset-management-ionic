import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SharedModulesModule} from '../../shared-modules/shared-modules.module';
// import { ForgotPage } from './forgot.page';

const routes: Routes = [
    // {
    //   path: '',
    //   component: ForgotPage
    // }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModulesModule,
        RouterModule.forChild(routes),
    ],
    // declarations: [ForgotPage]
})
export class ForgotPageModule {
}
