import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'file',
    template: `
        <div [formGroup]="form">

            <ion-label [attr.for]="field.label">
                {{field.label}}
                <strong class="text-danger" *ngIf="field.required">*</strong>
            </ion-label>
            <div *ngIf="!field.value" class="drop-container dropzone" dropZone (hovered)="toggleHover($event)"
                 (dropped)="field.onUpload($event)" [class.hovering]="isHovering">
                <ion-item>
                    <p class="m-0">
                        Drag a file here or
                        <label class="upload-button">
                            <input type="file" multiple="" (change)="field.onUpload($event.target.files)"> browse
                        </label>
                        to upload.
                    </p>
                </ion-item>
            </div>
            <div *ngIf="field.value">
                <!-- <button type="button" class="btn btn-primary">Change</button> -->
                <div class="card">
                    <ion-img class="card-img-top" [src]="field.value"></ion-img>
                </div>
            </div>

        </div>
    `,
    styles: [
            `
            .drop-container {
                background: #fff;
                border-radius: 6px;
                height: 150px;
                width: 100%;
                box-shadow: 1px 2px 20px hsla(0, 0%, 4%, .1);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px dashed #c0c4c7;
            }

            p {
                font-size: 16px;
                font-weight: 400;
                color: #c0c4c7;
            }

            .upload-button {
                display: inline-block;
                border: none;
                outline: none;
                cursor: pointer;
                color: #5754a3;
            }

            .upload-button input {
                display: none;
            }

            .dropzone {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                border-radius: 5px;
                background: white;
                margin: 10px 0;
            }

            .dropzone.hovering {
                border: 2px solid #f16624;
                color: #dadada !important;
            }

            progress::-webkit-progress-value {
                transition: width 0.1s ease;
            }
        `
    ]
})
export class FileComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;

    constructor() {

    }

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

    ngOnChange() {
        console.log(this.field.value);
        // this.field.value.
    }

    toggleHover($event) {

    }
}
