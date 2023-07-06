import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePropertiesListPage } from './theme-properties-list.page';

describe('ThemePropertiesListPage', () => {
  let component: ThemePropertiesListPage;
  let fixture: ComponentFixture<ThemePropertiesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThemePropertiesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
