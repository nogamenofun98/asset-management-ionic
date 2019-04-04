import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreateQCConfigPage, QcConfigPage} from './qc-config.page';
import {SearchQcConfigFilterPipe} from '../../pipe/qc-config/search-qc-config-filter.pipe';

const routes: Routes = [
    {
        path: '',
        component: QcConfigPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [QcConfigPage, SearchQcConfigFilterPipe, CreateQCConfigPage],
    entryComponents: [CreateQCConfigPage]
})
export class QcConfigPageModule {
}
