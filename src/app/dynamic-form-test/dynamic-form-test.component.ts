import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateQCConfigPage} from '../pages/qc-config/qc-config.page';

@Component({
    selector: 'dynamic-form-builder',
    template: `
        <form (ngSubmit)="submit(form)" [formGroup]="form" class="form-horizontal">
            <div *ngFor="let field of fields">
                <field-builder [appCreateDynamic]="appDynamic" [field]="field" [form]="form"></field-builder>
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
    @Input() appCreateQC: CreateQCConfigPage;
    form: FormGroup;
    public appDynamic = this;

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
                        console.log('value: ' + opt.value);
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

    public delField(control: any) {
        // console.log(control);
        const index = this.appCreateQC.fields.indexOf(control);
        // console.log(index);
        this.appCreateQC.fields.splice(index, 1); // to remove from the UI
        this.form.removeControl(control.name); // remove from the form control
        // console.log(this.form);
        // this.form.removeControl(control);
    }
}

