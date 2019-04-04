import {Component, Input} from '@angular/core';


@Component({
    selector: 'textbox',
    template: `
        <span [formGroup]="form">
            <ion-item>
                  <ion-label position="floating" [attr.for]="field.label">
                        {{field.label}}
                      <strong class="text-danger" *ngIf="field.required">*</strong>
                    </ion-label>
                  <ion-input *ngIf="!field.multiline" [attr.type]="field.type" class="form-control" [id]="field.name" [name]="field.name"
                             [formControlName]="field.name" [placeholder]="field.placeholder"></ion-input>
        <ion-textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
                      rows="9" class="form-control" [placeholder]="field.placeholder"></ion-textarea>
            </ion-item>
      </span>
    `
})
export class TextBoxComponent {
    @Input() field: any = {};
    @Input() form: any;

    constructor() {

    }

    get isValid() {
        return this.form.controls[this.field.name].valid;
    }

    get isDirty() {
        return this.form.controls[this.field.name].dirty;
    }
}
