import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {LandingPage} from './landing.page';
import {SharedModulesModule} from '../shared-modules/shared-modules.module';
// import { SearchProjectorFilterPipe } from '../../pipe/search-filter.pipe';


const routes: Routes = [
    {
        path: '',
        component: LandingPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModulesModule,
        RouterModule.forChild(routes),
        // SharedModuleModule,
        // ResetPageModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [LandingPage],
    entryComponents: [],
    // exports: [SearchProjectorFilterPipe]
})
export class LandingPageModule {
}
