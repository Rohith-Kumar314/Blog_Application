import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadArticle } from './read-article';

describe('ReadArticle', () => {
  let component: ReadArticle;
  let fixture: ComponentFixture<ReadArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
