import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-overview-graph',
  standalone: true,
  imports: [],
  templateUrl: './overview-graph.component.html',
  styleUrl: './overview-graph.component.css'
})
export class OverviewGraphComponent {
  @Input() startMonth!: string; // Mes inicial
  @Input() endMonth!: string; // Mes final
  chart!: Chart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startMonth'] || changes['endMont']) {
      this.updateGraph();
    }
  }

  updateGraph() {
    const labels = this.getMonthRange(this.startMonth, this.endMonth);
    const data = this.getSalesData(labels); // Aquí obtén tus datos de ventas

    // Si ya existe un gráfico, destrúyelo antes de crear uno nuevo
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line', // Gráfico de línea
      data: {
        labels: labels,
        datasets: [{
          label: 'Facturación', // Etiqueta de la línea
          data: data,
          borderColor: 'rgb(108, 183, 248)', // Color de la línea
          backgroundColor: 'rgb(202, 225, 245, 0.5)', // Color de fondo del área bajo la línea
          fill: true, // Rellenar debajo de la línea
          tension: 0.4, // Curvatura de las líneas
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

  getMonthRange(start: string, end: string): string[] {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const labels: string[] = [];
  
    while (startDate <= endDate) {
      // Formato 'mes-año' (ejemplo: 'sep-23')
      const formattedLabel = startDate.toLocaleString('default', { month: 'short' }) + '-' + startDate.getFullYear().toString().slice(-2);
      labels.push(formattedLabel);
      
      startDate.setMonth(startDate.getMonth() + 1);
    }
  
    // Opcional: Limitar el número de etiquetas si es necesario
    // Aquí puedes personalizar la lógica para mostrar solo ciertos meses
    return labels;
  }
  

  getSalesData(labels: string[]): number[] {
    // Define el rango de ventas
    const minSales = 100;  // Valor mínimo
    const maxSales = 500;  // Valor máximo
  
    // Genera un array de números aleatorios en el rango definido
    return labels.map(() => {
      return Math.floor(Math.random() * (maxSales - minSales + 1)) + minSales;
    });
  }
  
}

