import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAComponent } from './liste-a.component';

describe('ListeAComponent', () => {
  let component: ListeAComponent;
  let fixture: ComponentFixture<ListeAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAComponent]
    });
    fixture = TestBed.createComponent(ListeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
