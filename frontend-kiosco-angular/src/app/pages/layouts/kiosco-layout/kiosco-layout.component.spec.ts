import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioscoLayoutComponent } from './kiosco-layout.component';

describe('KioscoLayoutComponent', () => {
  let component: KioscoLayoutComponent;
  let fixture: ComponentFixture<KioscoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioscoLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KioscoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
