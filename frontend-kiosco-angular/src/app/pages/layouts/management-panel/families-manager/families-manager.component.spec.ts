import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesManagerComponent } from './families-manager.component';

describe('FamiliesManagerComponent', () => {
  let component: FamiliesManagerComponent;
  let fixture: ComponentFixture<FamiliesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliesManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamiliesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
