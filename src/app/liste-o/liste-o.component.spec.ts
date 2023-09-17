import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOComponent } from './liste-o.component';

describe('ListeOComponent', () => {
  let component: ListeOComponent;
  let fixture: ComponentFixture<ListeOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOComponent]
    });
    fixture = TestBed.createComponent(ListeOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
