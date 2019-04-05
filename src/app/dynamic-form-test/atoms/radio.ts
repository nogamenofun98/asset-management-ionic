import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'radio',
    template: `
        <div [formGroup]="form">
            <ion-list>
                <ion-radio-group formControlName="{{field.name}}">
                    <ion-list-header>
                        <ion-label [attr.for]="field.label">
                            {{field.label}}
                            <strong class="text-danger" *ngIf="field.required">*</strong>
                        </ion-label>
                    </ion-list-header>
                    <!--                    <div class="form-check" >-->
                    <ion-item *ngFor="let opt of field.options">
                        <ion-label class="form-check-label">
                            {{opt.label}}
                        </ion-label>
                        <!--                            <ion-radio class="form-check-input" [value]="opt.key"></ion-radio>-->
                        <ion-radio [value]="opt.key"></ion-radio>
                        {{opt.key}}

                    </ion-item>
                    <!--                    </div>-->
                </ion-radio-group>
            </ion-list>
        </div>
    `
})
export class RadioComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;
}
