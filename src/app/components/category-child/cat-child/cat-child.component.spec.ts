import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatChildComponent } from './cat-child.component';

describe('CatChildComponent', () => {
  let component: CatChildComponent;
  let fixture: ComponentFixture<CatChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatChildComponent]
    });
    fixture = TestBed.createComponent(CatChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
