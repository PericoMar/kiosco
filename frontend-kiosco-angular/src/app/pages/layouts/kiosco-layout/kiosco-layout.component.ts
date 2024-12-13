import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Kiosco } from '../../../interfaces/kiosco';
import { AlertService } from '../../../services/alert/alert.service';
import { KioskService } from '../../../services/kiosk/kiosk.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-kiosco-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './kiosco-layout.component.html',
  styleUrl: './kiosco-layout.component.css'
})
export class KioscoLayoutComponent {
  numSerieKiosco: string | null = null;

  constructor(private route: ActivatedRoute,
    private kioskoService: KioskService,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    console.log('App component initialized');
    // Escuchar el cambio de parámetros en las rutas
    this.route.paramMap.subscribe((paramMap) => {
      this.numSerieKiosco = paramMap.get('numSerieKiosco');
      console.log('Número de serie:', this.numSerieKiosco);
      this.kioskoService.getKioscoByNumSerie(this.numSerieKiosco!).subscribe({
        next: (kiosco: Kiosco) => {
          // Si se encuentra el kiosco, actualiza los valores necesarios
          this.userService.checkSubscriptionStatus(kiosco.cliente_id).subscribe({
            next: (response: any) => {
              if (response.subscription_status == 'inactivo') {
                this.showErrorMessage('Parece que tu suscripción está inactiva. Para seguir usando nuestros servicios, renueva tu suscripción lo antes posible. Si necesitas ayuda, no dudes en contactarnos.');
              } else {
                this.userService.clienteId = kiosco.cliente_id;
                this.kioskoService.kiosco = kiosco;
                console.log('Client ID:', this.userService.clienteId);
              }
            },
            error: (err: any) => {
              console.error('Error al comprobar alta de kiosco:', err);
              this.showErrorMessage('Ha ocurrido un error. Intente nuevamente.');
            }
          });

        },
        error: (err : any) => {
          // Si el kiosco no es encontrado, controla el error
          if (err.status === 404) {
            console.error('Kiosco no encontrado.'); // Opcional: registra el error
            // Lógica para manejar el error, como mostrar un mensaje de alerta
            this.showErrorMessage('Número de serie no válido. Por favor, verifique.');
          } else {
            console.error('Error inesperado:', err); // Para otros errores
            this.showErrorMessage('Ha ocurrido un error. Intente nuevamente.');
          }
        },
      });
      
    });
  }

  showErrorMessage(message: string): void {
    this.alertService.openAlertModal(message);
  }
}
