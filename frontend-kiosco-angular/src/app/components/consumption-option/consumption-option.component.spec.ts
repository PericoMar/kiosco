import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionOptionComponent } from './consumption-option.component';

describe('ConsumptionOptionComponent', () => {
  let component: ConsumptionOptionComponent;
  let fixture: ComponentFixture<ConsumptionOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumptionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
