import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutarticleComponent } from './ajoutarticle.component';

describe('AjoutarticleComponent', () => {
  let component: AjoutarticleComponent;
  let fixture: ComponentFixture<AjoutarticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutarticleComponent]
    });
    fixture = TestBed.createComponent(AjoutarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
