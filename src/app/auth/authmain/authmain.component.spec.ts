import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthmainComponent } from './authmain.component';

describe('AuthmainComponent', () => {
  let component: AuthmainComponent;
  let fixture: ComponentFixture<AuthmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthmainComponent]
    });
    fixture = TestBed.createComponent(AuthmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
