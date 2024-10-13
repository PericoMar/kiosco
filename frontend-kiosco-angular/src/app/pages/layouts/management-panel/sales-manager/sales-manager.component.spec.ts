import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagerComponent } from './sales-manager.component';

describe('SalesManagerComponent', () => {
  let component: SalesManagerComponent;
  let fixture: ComponentFixture<SalesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
