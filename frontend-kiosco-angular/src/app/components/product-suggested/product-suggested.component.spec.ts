import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuggestedComponent } from './product-suggested.component';

describe('ProductSuggestedComponent', () => {
  let component: ProductSuggestedComponent;
  let fixture: ComponentFixture<ProductSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSuggestedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
