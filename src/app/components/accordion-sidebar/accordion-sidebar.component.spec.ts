import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSidebarComponent } from './accordion-sidebar.component';

describe('AccordionSidebarComponent', () => {
  let component: AccordionSidebarComponent;
  let fixture: ComponentFixture<AccordionSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
