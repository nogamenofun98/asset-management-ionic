import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'dynamic-form-builder',
    template: `
        <form (ngSubmit)="submit(form)" [formGroup]="form" class="form-horizontal">
            <div *ngFor="let field of fields">
                <field-builder [field]="field" [form]="form"></field-builder>
            </div>
            <div class="form-row"></div>
            <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                    <ion-button type="submit" [disabled]="!form?.valid" class="btn btn-primary">Save</ion-button>
                    <strong>Saved all values</strong>
                </div>
            </div>
        </form>
    `,
})
export class DynamicFormTestComponent implements OnInit {
    @Input() fields: any[] = [];
    form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        const fieldsCtrls = {};
        for (const f of this.fields) {
            if (f.type !== 'checkbox' && f.type !== 'radio') {
                // console.log('is not checkbox and radio');
                fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
            } else {
                const opts = {};
                if (f.type === 'radio') {
                    // console.log('is radio');
                    // for (const opt of f.options) {
                    // opts[f.name] = new FormControl(opt.value);
                    fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
                    // }
                } else {
                    // console.log('is checkbox');
                    for (const opt of f.options) {
                        opts[opt.key] = new FormControl(opt.value);
                    }
                    fieldsCtrls[f.name] = new FormGroup(opts);
                }
                // fieldsCtrls[f.name] = new FormGroup(opts);
            }
        }
        this.form = new FormGroup(fieldsCtrls);
    }

    submit(form: any) {
        console.log(form);
    }
}
