import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogCardComponent } from './single-blog-card.component';

describe('SingleBlogCardComponent', () => {
  let component: SingleBlogCardComponent;
  let fixture: ComponentFixture<SingleBlogCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBlogCardComponent]
    });
    fixture = TestBed.createComponent(SingleBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
