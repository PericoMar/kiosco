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

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatError, MatLabel, CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  productImgUrl: string | ArrayBuffer | null = 'assets/svg/camera.svg';
  families!: Family[];

  familyId: string = '';
  products!: Product[];

  groups!: any[];

  tiposProducto = ['Producto', 'Grupo de modificadores' , 'Modificador'];
  tiposIVA = ['10%', '21%', '4%', '5%' ,'0%'];
  allergens: string[] = [
    'gluten', 'lactosa', 'altramuces', 'huevos' ,'apio', 'cacahuetes', 
    'crustaceos', 'cascara', 'mostaza', 'pescado', 'sesamo', 
    'soja', 'dioxido-azufre', 'moluscos'
  ];

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number | null, family: number | null, price_1: number | null, price_2: number | null, price_3: number | null, name: string | null, status: string | null },
    private fb: FormBuilder,
    private familyService: FamilyService,
    private groupService : GroupService,
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) {
    this.isEditMode = !!data.productId; // true si hay un id de producto
    this.productForm = this.fb.group({
      productType: ['Producto', Validators.required],
      name: ['', Validators.required],
      price_1: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?€?')]],
      price_2: ['', Validators.pattern('^[0-9]+(\\.[0-9]{1,2})$')],
      price_3: ['', Validators.pattern('^[0-9]+(\\.[0-9]{1,2})$')],
      family: ['', Validators.required],
      status: ['Habilitado', Validators.required],
      description: [''],
      min: ['', Validators.pattern('^[0-9]+')],
      max: ['', Validators.pattern('^[0-9]+')],
      iva: ['10%', Validators.required],
      allergens: this.fb.array(this.allergens.map(() => new FormControl(false))) // Array de checkboxes
    });

    if (this.isEditMode) {
      this.loadProductData(data.productId!);
    } 
  }

  ngOnInit(){
    this.families = this.familyService.families;
    this.products = this.productService.products;
    this.groups = this.groupService.groups;
    console.log(this.groups);
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
        this.familyId = '';
      } else {
        this.familyId = '';
        this.productForm.get('price_1')?.setValue('');
      }
    });
  }

  onFamilyIdChange(): void {
    this.products = this.productService.getProductsByFamilyId(this.familyId);
  }

  loadProductData(productId: number) {
    // Lógica para cargar los datos del producto si es modo edición
    // Por ejemplo, hacer una petición al backend para obtener el producto
    console.log(`Cargar datos del producto con ID: ${productId}`);
  }

  onDelete(id : number) {
    // Lógica para eliminar el producto
    console.log('Eliminar producto');
  }

  // ViewChild para acceder al input de archivo
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Método para abrir el selector de archivos
  editImage(): void {
    this.fileInput.nativeElement.click();
  }

  // Método para manejar la carga de la imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
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
      this.snackbarService.openSnackBar( `${productData.productType} creado con exito.` , 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
    } else {
      this.snackbarService.openSnackBar('Por favor, rellene los campos obligatorios', 'Cerrar');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
