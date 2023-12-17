import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFicheComponent } from './user-fiche.component';

describe('UserFicheComponent', () => {
  let component: UserFicheComponent;
  let fixture: ComponentFixture<UserFicheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFicheComponent]
    });
    fixture = TestBed.createComponent(UserFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
