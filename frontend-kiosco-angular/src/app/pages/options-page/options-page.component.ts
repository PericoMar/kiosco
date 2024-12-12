import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConsumptionOptionComponent } from '../../components/consumption-option/consumption-option.component';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { LanguageOption } from '../../interfaces/language-option';
import { LanguageOptionComponent } from '../../components/language-option/language-option.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdvertComponent } from '../../components/advert/advert.component';
import { ScreenService } from '../../services/screen/screen.service';
import { FamilyService } from '../../services/family.service';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { SnackbarService } from '../../services/snackBar/snackbar.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [ConsumptionOptionComponent, LanguageOptionComponent,FooterComponent, AdvertComponent],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.css'
})
export class OptionsPageComponent {
  // constructor (private translate: TranslateService) {
  //   this.translate.setDefaultLang('es');
  // }

  showAdvert: boolean = true;

  constructor(
    public screenService: ScreenService,
    private familyService: FamilyService,
    private productsService: ProductService,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {      
    this.showAdvert = true;
    this.getAllData();
  }
  

  advert : string = "¡Bienvenido a nuestro kiosco!";

  consumptionOptions : ConsumptionOption[] = [
    {
      name: "comer_aqui",
      title: "Comer aquí",
      img: "../../../assets/svg/eat.svg"
    },
    {
      name: "llevar",
      title: "Llevar",
      img: "../../../assets/3479191-200.png"
    }
  ];

  languageOptions : LanguageOption[] = [
    {
      name: "Español",
      img: "../../../assets/svg/flag-for-flag-spain.svg"
    },
    {
      name: "English",
      img: "../../../assets/svg/flag-for-flag-united-kingdom.svg"
    }
  ]

  quitAdvert() {
    this.screenService.setDefaultScreenHeight();
    this.showAdvert = false;
  }

  getAllData(): void {
    forkJoin([
      this.familyService.getFamiliesObservable(this.userService.clienteId),
      this.productsService.getProductsObservable(this.userService.clienteId)
    ]).subscribe({
      next: ([families, products]) => {
        this.familyService.families = families;
        this.productsService.products = products;
        this.snackbarService.openSnackBar('Datos cargados.', 'Cerrar');
        console.log('Families:', families);
        console.log('Products:', products);
      }
    });
  }
  
}
