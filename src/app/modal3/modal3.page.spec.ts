import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal3Page } from './modal3.page';

describe('Modal3Page', () => {
  let component: Modal3Page;
  let fixture: ComponentFixture<Modal3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
