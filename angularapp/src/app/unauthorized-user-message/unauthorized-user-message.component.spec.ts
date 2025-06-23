import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedUserMessageComponent } from './unauthorized-user-message.component';

describe('UnauthorizedUserMessageComponent', () => {
  let component: UnauthorizedUserMessageComponent;
  let fixture: ComponentFixture<UnauthorizedUserMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizedUserMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
