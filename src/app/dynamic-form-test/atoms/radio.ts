import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'radio',
    template: `
        <div [formGroup]="form">
            <div class="form-check" *ngFor="let opt of field.options">
                <ion-item>
                    <ion-label position="floating" [attr.for]="field.label">
                        {{field.label}}
                        <strong class="text-danger" *ngIf="field.required">*</strong>
                    </ion-label>
                    <ion-label class="form-check-label">
                        {{opt.label}}
                    </ion-label>
                    <ion-radio class="form-check-input" [value]="opt.key"></ion-radio>
                </ion-item>
            </div>
        </div>
    `
})
export class RadioComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;
}
