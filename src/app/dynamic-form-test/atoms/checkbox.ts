import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'checkbox',
    template: `
        <div [formGroup]="form">
            <div [formGroupName]="field.name">
                <ion-list>
                    <ion-list-header>
                        <ion-label [attr.for]="field.label">
                            {{field.label}}
                            <strong class="text-danger" *ngIf="field.required">*</strong>
                        </ion-label>
                    </ion-list-header>
                    <div *ngFor="let opt of field.options" class="form-check form-check">
                        <ion-item>
                            <ion-label class="form-check-label">{{opt.label}}</ion-label>
                            <ion-checkbox [formControlName]="opt.key" class="form-check-input" id="inlineCheckbox1"></ion-checkbox>
                        </ion-item>
                    </div>
                </ion-list>
            </div>
        </div>
    `
})
export class CheckBoxComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;

    get isValid() {
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
}
