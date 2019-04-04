import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewClassroomPage} from './view-classroom.page';

describe('ViewClassroomPage', () => {
    let component: ViewClassroomPage;
    let fixture: ComponentFixture<ViewClassroomPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewClassroomPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewClassroomPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
