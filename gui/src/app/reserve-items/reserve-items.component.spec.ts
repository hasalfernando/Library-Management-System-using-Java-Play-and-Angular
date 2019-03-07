import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveItemsComponent } from './reserve-items.component';

describe('ReserveItemsComponent', () => {
  let component: ReserveItemsComponent;
  let fixture: ComponentFixture<ReserveItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
