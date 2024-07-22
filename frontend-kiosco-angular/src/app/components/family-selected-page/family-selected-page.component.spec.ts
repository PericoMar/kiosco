import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySelectedPageComponent } from './family-selected-page.component';

describe('FamilySelectedPageComponent', () => {
  let component: FamilySelectedPageComponent;
  let fixture: ComponentFixture<FamilySelectedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilySelectedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilySelectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
