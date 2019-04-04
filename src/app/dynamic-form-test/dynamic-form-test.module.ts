import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
// components
import {FieldBuilderComponent} from './field-builder/field-builder.component';
import {TextBoxComponent} from './atoms/textbox';
import {DropDownComponent} from './atoms/dropdown';
import {FileComponent} from './atoms/file';
import {CheckBoxComponent} from './atoms/checkbox';
import {RadioComponent} from './atoms/radio';
import {DynamicFormTestComponent} from './dynamic-form-test.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DynamicFormTestComponent,
        FieldBuilderComponent,
        TextBoxComponent,
        DropDownComponent,
        CheckBoxComponent,
        FileComponent,
        RadioComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [DynamicFormTestComponent],
    providers: []
})
export class DynamicFormTestModule {
}
