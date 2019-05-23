import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModulesModule} from '../../shared-modules/shared-modules.module';
// import { RegisterPage } from './register.page';

const routes: Routes = [
    // {
    //   path: '',
    //   component: RegisterPage
    // }
];

@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // IonicModule,
        SharedModulesModule,
        RouterModule.forChild(routes)
    ],
    // declarations: [RegisterPage]
})
export class RegisterPageModule {
}
