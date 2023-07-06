import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePropertiesPage } from './theme-properties.page';

describe('ThemePropertiesPage', () => {
  let component: ThemePropertiesPage;
  let fixture: ComponentFixture<ThemePropertiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThemePropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
