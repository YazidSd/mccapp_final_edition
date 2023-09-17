import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuADComponent } from './menu-ad.component';

describe('MenuADComponent', () => {
  let component: MenuADComponent;
  let fixture: ComponentFixture<MenuADComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuADComponent]
    });
    fixture = TestBed.createComponent(MenuADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
