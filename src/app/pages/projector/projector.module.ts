import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CreateProjectorPage, ProjectorPage} from './projector.page';
import {SearchProjectorFilterPipe} from '../../pipe/projector/search-projector-filter.pipe';

const routes: Routes = [
    {
        path: '',
        component: ProjectorPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ProjectorPage, SearchProjectorFilterPipe, CreateProjectorPage],
    entryComponents: [CreateProjectorPage]
})
export class ProjectorPageModule {
}
