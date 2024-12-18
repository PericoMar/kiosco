import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FamilyService } from '../../../../../services/family.service';
import { Family } from '../../../../../interfaces/family';
import { GroupService } from '../../../../../services/group/group.service';
import { Product } from '../../../../../interfaces/pedido';
import { ProductService } from '../../../../../services/product.service';
import { SnackbarService } from '../../../../../services/snackBar/snackbar.service';
import { SpinnerComponent } from '../../../../../components/spinner/spinner.component';
import { AppConfig } from '../../../../../../config/app-config';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  loadingProduct!: boolean;
  productForm: FormGroup;
  isEditMode: boolean;

  productImgUrl: string | ArrayBuffer | null = 'assets/svg/camera.svg';
  selectedFile!: File;  
  families!: Family[];

  familyId: string = '';
  products!: Product[];

  groups!: any[];

  tiposProducto = ['Producto', 'Grupo de modificadores' , 'Modificador'];
  tiposIVA = [{id: 1, tipo_iva:'10%'}, { id:2, tipo_iva:'21%' }, { id:3,tipo_iva: '4%' }, { id: 4, tipo_iva: '5%' }, { id: 5, tipo_iva: '0%'}];
  allergens: string[] = [
    'gluten', 'lactosa', 'altramuces', 'huevos' ,'apio', 'cacahuetes', 
    'crustaceos', 'cascara', 'mostaza', 'pescado', 'sesamo', 
    'soja', 'dioxido-azufre', 'moluscos'
  ];

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null, family: number | null, price_1: number | null, price_2: number | null, price_3: number | null, name: string | null, status: string | null, productType : string },
    private fb: FormBuilder,
    private familyService: FamilyService,
    private groupService : GroupService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {
    console.log(data);
    this.isEditMode = !!data.id; // true si hay un id de producto
    this.productForm = this.fb.group({
      productType: ['Producto', Validators.required],
      name: ['', Validators.required],
      img: [null],
      price_1: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?€?')]],
      price_2: ['', Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      price_3: ['', Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      family: ['', Validators.required],
      status: ['Habilitado', Validators.required],
      description: [''],
      min: ['', Validators.pattern('^[0-9]+')],
      max: ['', Validators.pattern('^[0-9]+')],
      iva: ['1'],
      allergens: this.fb.array(this.allergens.map(() => new FormControl(false))) // Array de checkboxes
    });

    if (this.isEditMode) {
      this.loadingProduct = true;
      this.loadProductData(data.id!, data.productType);
    }
  }

  ngOnInit() {
    const observables : any = {};
  
    // Usamos el getter directamente si la key existe en localStorage
    if (this.familyService.keyExists()) {
      this.families = this.familyService.families;  // Esto puede ser un observable o los datos desde el getter
    } else {
      observables['families'] = this.familyService.getFamiliesObservable(this.userService.clienteId);
    }

    console.log(observables);
  
    if (this.productService.keyExists()) {
      this.products = this.productService.products;  // Usamos el getter
    } else {
      observables['products'] = this.productService.getProductsObservable(this.userService.clienteId);
    }
  
    if (this.groupService.keyExists()) {
      this.groups = this.groupService.groups;
    } else {
      observables['groups'] = this.groupService.getGroupsObservable();
    }
    
    if(observables.length != 0){
      forkJoin(observables).subscribe({
        next: ({ families, products, groups } : any) => {
          this.families = families;
          this.products = products;
          this.groups = groups;
    
          // if (this.isEditMode) {
          //   this.loadProductData(this.data.id!, this.data.productType);
          // }
        },
        error: (error) => {
          console.error('Error al cargar datos:', error);
        }
      });
    }
  
    this.onTipoProductoChange();
  }

  onTipoProductoChange(): void {
    this.productForm.get('productType')?.valueChanges.subscribe(value => {
      this.productForm.markAsUntouched();
      const camposInvalidos = document.querySelectorAll('.invalid');

      // Elimina la clase de todos los elementos seleccionados
      camposInvalidos.forEach(element => {
        element.classList.remove('invalid');
      });

      //Si el tipo de producto es un grupo de modificadores, se le settea a price_1 el valor de 0
      if(value === 'Grupo de modificadores'){
        this.productForm.get('price_1')?.setValue('0');
        this.productForm.get('price_2')?.setValue('0');
        this.productForm.get('price_3')?.setValue('0');
      } else {
        this.productForm.get('price_1')?.setValue('');
        this.productForm.get('price_2')?.setValue('');
        this.productForm.get('price_3')?.setValue('');
      }
      this.familyId = '';
    });
  }

  onFamilyIdChange(): void {
    if(this.familyService.keyExists()){
      this.products = this.productService.getProductsByFamilyId(this.familyId);
    } else {
      this.familyService.getFamiliesObservable(this.userService.clienteId).subscribe(families => {
        this.familyService.families = families;
        this.products = this.productService.getProductsByFamilyId(this.familyId);
      });
    }
  }

  loadProductData(productId: number, productType: string): void {
    this.productService.getProductById(productId.toString(), productType).subscribe(product => {
      console.log(product);
      this.productForm.patchValue(product);

      if(productType !== 'Grupo de modificadores') {
        // Procesar los alérgenos
        const allergensState = this.allergens.map(allergen => 
          product.allergens?.includes(allergen) || false
        );

        // Actualizar el FormArray de alérgenos
        this.allergensArray.clear(); // Limpiar el array anterior
        allergensState.forEach(state => this.allergensArray.push(new FormControl(state)));
      }

      this.productImgUrl = product.img ? AppConfig.STORAGE_URL + product.img : 'assets/svg/camera.svg';
      this.loadingProduct = false;
      console.log(this.allergensArray);
    });
  }

  onDelete(product : any) {
    this.productService.openDeleteProductModal(product);
  }

  // ViewChild para acceder al input de archivo
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Método para abrir el selector de archivos
  editImage(): void {
    this.fileInput.nativeElement.click();
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const file = input.files[0];
      const reader = new FileReader();

      this.productForm.patchValue({
        img: file
      });

      reader.onload = (e) => {
        this.productImgUrl = e.target?.result!; // Guarda la URL de la imagen cargada
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  }

  getStatusClass(status: string): string {
    if (status === 'Habilitado') {
      return 'habilitado';
    } else if (status === 'Deshabilitado') {
      return 'deshabilitado';
    }
    return '';
  }

  changeStatus(){
    this.productForm.value.status = this.productForm.value.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.productForm.value.status);
  }


  toggleAllergen(index: number): void {
    const allergenValue = this.allergensArray.at(index).value;
    this.allergensArray.at(index).setValue(!allergenValue);
  }

  get labelFamilia(): string {
    const productType = this.productForm.value.productType;
    if(productType === 'Grupo de modificadores'){
      return 'Producto y estado';
    }
    return productType === 'Modificador' ? 'Grupo de modificadores y estado' : 'Familia y estado';
  }
  
  get placeholderFamilia(): string {
    const productType = this.productForm.value.productType;
    if(productType === 'Grupo de modificadores'){
      return 'Seleccione producto';
    }
    return this.productForm.value.productType === 'Modificador' ?  'Seleccione grupo' : 'Seleccione familia';
  }

  get labelNombre(): string {
    const productType = this.productForm.value.productType;
    if (productType === 'Grupo de modificadores') {
      return 'Texto';
    }
    return `Nombre del ${productType === 'Modificador' ? 'modificador' : 'producto'}`;
  }

  get placeholderNombre(): string {
    const productType = this.productForm.value.productType;
    if (productType === 'Grupo de modificadores') {
      return 'Ej: Escoge tu salsa';
    }
    return productType === 'Modificador' ? 'Ej: Salsa verde' : 'Ej: Pizza';
  }

  get errorMsgNombre(): string {
    const productType = this.productForm.value.productType;
    return  productType === 'Grupo de modificadores' ? 'El texto es obligatorio' : 'El nombre es obligatorio';
  }

  get placeholderDesc() : string{
    const productType = this.productForm.value.productType;
    if (productType === 'Grupo de modificadores') {
      return 'Ej: Pregunta al cliente el punto de la carne.';
    }
    return productType === 'Modificador' ? 'Ej: Opción para la pregunta: ¿Qué postre desea?' : 'Ej: Hamburguesa con queso y bacon.';
  }

  get allergensArray(): FormArray {
    return this.productForm.get('allergens') as FormArray;
  }

  getAllergenImage(allergen: string): any {
    const allergenImages: { [key: string]: string } = {
      'gluten': 'assets/alergenos/gluten.png',
      'lactosa': 'assets/alergenos/lacteo.png',
      'altramuces': 'assets/alergenos/altramuces.png',
      'apio': 'assets/alergenos/apio.png',
      'cacahuetes': 'assets/alergenos/cacahuetes.png',
      'crustaceos': 'assets/alergenos/crustaceos.png',
      'cascara': 'assets/alergenos/cascara.png',
      'mostaza': 'assets/alergenos/mostaza.png',
      'pescado': 'assets/alergenos/pescado.png',
      'sesamo': 'assets/alergenos/sesamo.png',
      'soja': 'assets/alergenos/soja.png',
      'dioxido-azufre': 'assets/alergenos/dioxido-azufre.png',
      'moluscos': 'assets/alergenos/moluscos.png',
      'huevos': 'assets/alergenos/huevos.png',
    };
    return allergenImages[allergen] || 'path/to/default-icon.png'; // Imagen por defecto si no se encuentra
  }
  

  tooltipIndex: number | null = null;
  tooltipTimeout: any;

  showTooltip(index: number): void {
    this.tooltipTimeout = setTimeout(() => {
      this.tooltipIndex = index;
    }, 600); // Muestra el tooltip después de 1 segundo
  }

  hideTooltip(index: number): void {
    clearTimeout(this.tooltipTimeout);
    this.tooltipIndex = null;
  }

  save() {
    this.productForm.markAllAsTouched(); 
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.dialogRef.close(productData);
      // this.snackbarService.openSnackBar( `${productData.productType} creado con exito.` , 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
    } else {
      this.snackbarService.openSnackBar('Por favor, revise los campos y rellene los obligatorios.', 'Cerrar');
      // Hacer console.log de porque es invalido el formulario:
      console.log(this.productForm);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
