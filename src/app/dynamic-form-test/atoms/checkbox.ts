import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'checkbox',
    template: `
        <div [formGroup]="form">
            <div [formGroupName]="field.name">
                <ion-item>
                <div *ngFor="let opt of field.options" class="form-check form-check">
                    <ion-label class="form-check-label">{{opt.label}}</ion-label>
                    <ion-checkbox [formControlName]="opt.key" class="form-check-input" id="inlineCheckbox1"></ion-checkbox>
                </div>
                </ion-item>
            </div>

        </div>
    `
})
export class CheckBoxComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }
}
