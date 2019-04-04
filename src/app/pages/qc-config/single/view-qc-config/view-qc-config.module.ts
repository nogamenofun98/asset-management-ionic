import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ViewQcConfigPage} from './view-qc-config.page';

const routes: Routes = [
    {
        path: '',
        component: ViewQcConfigPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ViewQcConfigPage]
})
export class ViewQcConfigPageModule {
}
