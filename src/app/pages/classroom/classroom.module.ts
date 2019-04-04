import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ClassroomPage, CreateClassroomPage} from './classroom.page';
import {SearchClassroomFilterPipe} from '../../pipe/classroom/search-classroom-filter.pipe';

const routes: Routes = [
    {
        path: '',
        component: ClassroomPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ClassroomPage, SearchClassroomFilterPipe, CreateClassroomPage],
    entryComponents: [CreateClassroomPage]
})
export class ClassroomPageModule {
}
