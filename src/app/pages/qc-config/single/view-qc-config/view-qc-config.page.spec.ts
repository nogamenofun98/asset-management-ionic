import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewQcConfigPage} from './view-qc-config.page';

describe('ViewQcConfigPage', () => {
    let component: ViewQcConfigPage;
    let fixture: ComponentFixture<ViewQcConfigPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewQcConfigPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewQcConfigPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
