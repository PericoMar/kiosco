import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataphoneModalComponent } from './dataphone-modal.component';

describe('DataphoneModalComponent', () => {
  let component: DataphoneModalComponent;
  let fixture: ComponentFixture<DataphoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataphoneModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataphoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
