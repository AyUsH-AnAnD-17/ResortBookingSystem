import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResortComponent } from './view-resort.component';

describe('ViewResortComponent', () => {
  let component: ViewResortComponent;
  let fixture: ComponentFixture<ViewResortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
