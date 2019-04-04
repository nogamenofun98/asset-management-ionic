import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ViewClassroomPage} from './view-classroom.page';

const routes: Routes = [
    {
        path: '',
        component: ViewClassroomPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ViewClassroomPage]
})
export class ViewClassroomPageModule {
}
