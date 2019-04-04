import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectorPage} from './projector.page';

describe('ProjectorPage', () => {
    let component: ProjectorPage;
    let fixture: ComponentFixture<ProjectorPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectorPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectorPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
