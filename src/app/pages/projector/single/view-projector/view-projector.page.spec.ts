import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewProjectorPage} from './view-projector.page';

describe('ViewProjectorPage', () => {
    let component: ViewProjectorPage;
    let fixture: ComponentFixture<ViewProjectorPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewProjectorPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewProjectorPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
