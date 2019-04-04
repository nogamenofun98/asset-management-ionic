import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'field-builder',
    template: `
        <div class="form-group row" [formGroup]="form">
            <div [ngSwitch]="field.type">
                <ion-label [attr.for]="field.label">
                    {{field.label}}
                    <strong class="text-danger" *ngIf="field.required">*</strong>
                </ion-label>
                <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
                <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
                <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
                <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
                <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
                <div *ngIf="!isValid && isDirty">{{field.label}} is required</div>
            </div>
        </div>
    `
})
export class FieldBuilderComponent implements OnInit {
    @Input() field: any;
    @Input() form: any;

    constructor() {
    }

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }

    ngOnInit() {
        console.log(this.form);
    }

}
