import {Component, Input, OnInit} from '@angular/core';
import {DynamicFormTestComponent} from '../dynamic-form-test.component';

@Component({
    selector: 'field-builder',
    template: `
        <div class="form-group row" [formGroup]="form">
            <div [ngSwitch]="field.type">

                <!--                    <ion-label [attr.for]="field.label">-->
                <!--                        {{field.label}}-->
                <!--                        <strong class="text-danger" *ngIf="field.required">*</strong>-->
                <!--                    </ion-label>-->
                <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
                <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
                <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
                <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
                <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
                <ion-icon (click)="appCreateDynamic.delField(field)" name="close-circle"></ion-icon>
                <div *ngIf="!isValid && isDirty">{{field.label}} is required</div>
            </div>
        </div>
    `
})
export class FieldBuilderComponent implements OnInit {
    @Input() field: any;
    @Input() form: any;
    @Input() appCreateDynamic: DynamicFormTestComponent;

    constructor() {
    }

    get isValid() {
        console.log(this.form);
        // console.log(this.form);
        if (Object.keys(this.form.controls).length === 0) {
            return 0;
        }
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        if (Object.keys(this.form.controls).length === 0) {
            return 0;
        }
        return this.form.controls[this.field.name].dirty;
    }

    ngOnInit() {
        // console.log(this.form);
    }

}
