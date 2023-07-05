import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeEditPage } from './theme-edit.page';

describe('ThemeEditPage', () => {
  let component: ThemeEditPage;
  let fixture: ComponentFixture<ThemeEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThemeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
