import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchModal2Page } from './search-modal2.page';

describe('SearchModal2Page', () => {
  let component: SearchModal2Page;
  let fixture: ComponentFixture<SearchModal2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchModal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
