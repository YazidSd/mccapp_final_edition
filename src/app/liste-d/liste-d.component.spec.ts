import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDComponent } from './liste-d.component';

describe('ListeDComponent', () => {
  let component: ListeDComponent;
  let fixture: ComponentFixture<ListeDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDComponent]
    });
    fixture = TestBed.createComponent(ListeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
