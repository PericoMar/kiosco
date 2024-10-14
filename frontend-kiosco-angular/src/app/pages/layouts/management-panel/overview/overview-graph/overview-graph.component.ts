import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-overview-graph',
  standalone: true,
  imports: [],
  templateUrl: './overview-graph.component.html',
  styleUrl: './overview-graph.component.css'
})
export class OverviewGraphComponent {
  ngAfterViewInit() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line', // Gráfico de línea
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ventas',
          data: [120, 190, 300, 500, 200, 300],
          borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo del área bajo la línea
          fill: true, // Rellenar debajo de la línea
          tension: 0.4, // Curvatura de las líneas (ajústalo a tu gusto)
          borderWidth: 2, // Grosor de la línea
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
