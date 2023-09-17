import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisComponent } from './autoris.component';

describe('AutorisComponent', () => {
  let component: AutorisComponent;
  let fixture: ComponentFixture<AutorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorisComponent]
    });
    fixture = TestBed.createComponent(AutorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
