import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablistfComponent } from './tablistf.component';

describe('TablistfComponent', () => {
  let component: TablistfComponent;
  let fixture: ComponentFixture<TablistfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablistfComponent]
    });
    fixture = TestBed.createComponent(TablistfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
