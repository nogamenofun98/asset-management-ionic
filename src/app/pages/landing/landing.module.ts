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
    },
    // {path: 'reset', loadChildren: './pages/auth/reset/reset.module#ResetPageModule'},
    // // {path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule'}, // because make it as a modal pop only
    // // {path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule'},
    // {path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard]},
    // {path: 'projectors', loadChildren: './pages/projector/projector.module#ProjectorPageModule', canActivate: [AuthGuard]},
    // {
    //     path: 'projectors/:id',
    //     loadChildren: './pages/projector/single/view-projector/view-projector.module#ViewProjectorPageModule',
    //     canActivate: [AuthGuard]
    // },
    // {path: 'classrooms', loadChildren: './pages/classroom/classroom.module#ClassroomPageModule', canActivate: [AuthGuard]},
    // {
    //     path: 'classrooms/:id',
    //     loadChildren: './pages/classroom/single/view-classroom/view-classroom.module#ViewClassroomPageModule',
    //     canActivate: [AuthGuard]
    // },
    // {path: 'qc_configure', loadChildren: './pages/qc-config/qc-config.module#QcConfigPageModule', canActivate: [AuthGuard]},
    // {
    //     path: 'qc_configure/:id',
    //     loadChildren: './pages/qc-config/single/view-qc-config/view-qc-config.module#ViewQcConfigPageModule',
    //     canActivate: [AuthGuard]
    // },
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
    exports: [RouterModule]
})
export class LandingPageModule {
}
