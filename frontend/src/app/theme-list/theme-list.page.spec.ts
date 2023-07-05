import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeListPage } from './theme-list.page';

describe('ThemeListPage', () => {
  let component: ThemeListPage;
  let fixture: ComponentFixture<ThemeListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThemeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
