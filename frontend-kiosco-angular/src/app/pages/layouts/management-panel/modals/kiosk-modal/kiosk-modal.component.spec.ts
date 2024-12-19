import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskModalComponent } from './kiosk-modal.component';

describe('KioskModalComponent', () => {
  let component: KioskModalComponent;
  let fixture: ComponentFixture<KioskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KioskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
