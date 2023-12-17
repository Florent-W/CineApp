import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './listItem.component';

describe('ListsComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
    });
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
