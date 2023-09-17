import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdremComponent } from './ordrem.component';

describe('OrdremComponent', () => {
  let component: OrdremComponent;
  let fixture: ComponentFixture<OrdremComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdremComponent]
    });
    fixture = TestBed.createComponent(OrdremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
