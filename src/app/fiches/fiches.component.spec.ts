import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesComponent } from './fiches.component';

describe('FichesComponent', () => {
  let component: FichesComponent;
  let fixture: ComponentFixture<FichesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichesComponent]
    });
    fixture = TestBed.createComponent(FichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
