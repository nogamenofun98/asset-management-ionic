import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: `
        <div [formGroup]="form">
            <ion-item>
                <ion-label position="floating" [attr.for]="field.label">
                    {{field.label}}
                    <strong class="text-danger" *ngIf="field.required">*</strong>
                </ion-label>
                <ion-select [id]="field.name" [formControlName]="field.name">
                    <ion-select-option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</ion-select-option>
                </ion-select>
            </ion-item>
        </div>
    `
})
export class DropDownComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;

    constructor() {

    }
}
