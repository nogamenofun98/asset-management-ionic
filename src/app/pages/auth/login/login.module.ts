import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModulesModule} from '../../shared-modules/shared-modules.module';
// import {LoginPage} from './login.page';

const routes: Routes = [
    // {
    //     path: '',
    //     component: LoginPage
    // }
];

@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // IonicModule,
        SharedModulesModule,
        RouterModule.forChild(routes),

    ],
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // declarations: [LoginPage],
})
export class LoginPageModule {
}
