import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicListPage } from './topic-list.page';

describe('TopicListPage', () => {
  let component: TopicListPage;
  let fixture: ComponentFixture<TopicListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
