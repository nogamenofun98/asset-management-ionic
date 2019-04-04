import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreateQCConfigPage, QcConfigPage} from './qc-config.page';
import {SearchQcConfigFilterPipe} from '../../pipe/qc-config/search-qc-config-filter.pipe';
import {DynamicFormTestModule} from '../../dynamic-form-test/dynamic-form-test.module';

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
        RouterModule.forChild(routes),
        DynamicFormTestModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [QcConfigPage, SearchQcConfigFilterPipe, CreateQCConfigPage],
    entryComponents: [CreateQCConfigPage]
})
export class QcConfigPageModule {
}
