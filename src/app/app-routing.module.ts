import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'landing',
    //     pathMatch: 'full'
    // },
    {path: '', loadChildren: './pages/landing/landing.module#LandingPageModule'},
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
    {path: '**', redirectTo: '/'},


// must be last because it is a last result of wrong path redirect
    // { path: 'forgot', loadChildren: './pages/auth/forgot/forgot.module#ForgotPageModule' },


];

@NgModule({
    imports: [
        // RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
