import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGraphComponent } from './products-graph.component';

describe('ProductsGraphComponent', () => {
  let component: ProductsGraphComponent;
  let fixture: ComponentFixture<ProductsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
