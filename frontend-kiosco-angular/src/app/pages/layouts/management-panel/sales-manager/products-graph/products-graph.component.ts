import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductData } from '../../../../../interfaces/product-data';
import { ProductService } from '../../../../../services/product.service';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-products-graph',
  standalone: true,
  imports: [],
  templateUrl: './products-graph.component.html',
  styleUrl: './products-graph.component.css'
})
export class ProductsGraphComponent {
  products!: ProductData[];
  chart! : Chart
  @Input() familySelected: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService
      .getProductsData()
      .filter((product) => product.productType === 'Producto');

    this.createSalesChart();
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes['familySelected']) {
      if(this.familySelected !== '') {
      console.log(this.products);
      this.products = this.productService
        .getProductsData()
        .filter((product) => product.family === this.familySelected && product.productType === 'Producto');

      console.log(this.familySelected);
      console.log(this.products);
      } else {
        this.products = this.productService
          .getProductsData()
          .filter((product) => product.productType === 'Producto');
      }
      this.createSalesChart();
    }
  }


  createSalesChart() {
    // Generar datos aleatorios para las ventas
    const productLabels = this.products.map((product) => product.name);
    const salesData = this.products.map(() => Math.floor(Math.random() * 100) + 1); // Datos aleatorios entre 1 y 100

    if(this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: productLabels,
        datasets: [
          {
            label: 'Ventas de Productos',
            data: salesData,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw} ventas`;
              },
            },
          },
        },
      },
    });
  }
}
