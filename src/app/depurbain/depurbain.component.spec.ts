import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepurbainComponent } from './depurbain.component';

describe('DepurbainComponent', () => {
  let component: DepurbainComponent;
  let fixture: ComponentFixture<DepurbainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepurbainComponent]
    });
    fixture = TestBed.createComponent(DepurbainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
