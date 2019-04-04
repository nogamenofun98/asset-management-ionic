import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QcConfigPage} from './qc-config.page';

describe('QcConfigPage', () => {
    let component: QcConfigPage;
    let fixture: ComponentFixture<QcConfigPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QcConfigPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QcConfigPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
