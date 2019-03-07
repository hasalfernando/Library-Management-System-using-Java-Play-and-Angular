import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemsComponent } from './remove-items.component';

describe('RemoveItemsComponent', () => {
  let component: RemoveItemsComponent;
  let fixture: ComponentFixture<RemoveItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
