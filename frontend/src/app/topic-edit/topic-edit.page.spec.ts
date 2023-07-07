import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicEditPage } from './topic-edit.page';

describe('TopicEditPage', () => {
  let component: TopicEditPage;
  let fixture: ComponentFixture<TopicEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopicEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
