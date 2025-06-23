import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResortComponent } from './add-resort.component';

describe('AddResortComponent', () => {
  let component: AddResortComponent;
  let fixture: ComponentFixture<AddResortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
