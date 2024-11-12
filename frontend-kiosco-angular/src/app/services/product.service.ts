import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu, Product } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app-config';
import { FamilyService } from './family.service';
import { ProductData } from '../interfaces/product-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../pages/layouts/management-panel/modals/product-modal/product-modal.component';




@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: Product[] = [
    {
      id: '1',
      name: 'Muzzarella',
      price: 10.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y aceitunas',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten']
    },
    {
      id: 'p1',
      name: 'Hamburguesa especial',
      img: 'assets/burguer.png',
      price: 12.99,
      description: 'Una deliciosa hamburguesa con ingredientes frescos y personalizables.',
      familyId: '1',
      customizations: [],
      customizationQuestions: [
        {
          id: 'pan',
          name: '¿Qué tipo de pan prefieres?',
          questionType: 'single',
          minChoices: 1,
          options: [
            { id: 'pan-avena', value: 'Pan de avena', price: 0, img: 'assets/pan.png' },
            { id: 'pan-integral', value: 'Pan integral', price: 0.5, img: 'assets/pan.png' },
            { id: 'pan-brioche', value: 'Pan brioche', price: 1.0, img: 'assets/pan.png' },
            { id: 'pan-cereales', value: 'Pan cereales', price: 1.5, img: 'assets/pan.png' },
            { id: 'pan-tostado', value: 'Pan tostado', price: 0, img: 'assets/pan.png' }
          ],
        },
        {
          id: 'carne',
          name: '¿Qué nivel de cocción deseas?',
          questionType: 'single',
          minChoices: 1,
          options: [
            { id: 'poco-hecho', value: 'Poco hecho', price: 0 },
            { id: 'en-su-punto', value: 'En su punto', price: 0 },
            { id: 'bien-hecho', value: 'Bien hecho', price: 0.5 }
          ],
        },
        {
          id: 'extra',
          name: 'Añade algún extra:',
          questionType: 'multiple',
          minChoices: 0,
          maxChoices: 2,
          options: [
            { id: 'bacon', value: 'Bacon', price: 1.5 },
            { id: 'aguacate', value: 'Aguacate', price: 1.0 },
            { id: 'champinones', value: 'Champiñones', price: 0.7 }
          ],
        },
      ],
      allergens: ['gluten', 'lactosa', 'soja']
    },
    {
      id: '2',
      name: 'Fugazzeta',
      price: 9.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Fugazzeta con cebolla y queso',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa']
    },
    {
      id: '9',
      name: 'Napolitana',
      price: 11.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y ajo',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten']
    },
    {
      id: '10',
      name: 'Calabresa',
      price: 10,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella y calabresa',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten', 'mostaza']
    },
    {
      id: '11',
      name: 'Cuatro Quesos',
      price: 10.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, provolone, roquefort y parmesano',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten']
    },
    {
      id: '12',
      name: 'Hawaiana',
      price: 10,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, jamón y ananá',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten', 'soja']
    },
    {
      id: '13',
      name: 'Pepperoni',
      price: 10.30,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella y pepperoni',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten', 'soja']
    },
    {
      id: '14',
      name: 'Vegetariana',
      price: 8,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, pimientos, cebolla, aceitunas y champiñones',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten', 'soja', 'sesamo']
    },
    {
      id: '15',
      name: 'Margherita',
      price: 10.30,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y albahaca',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten']
    },
    {
      id: '16',
      name: 'Barbacoa',
      price: 12,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, carne, cebolla y salsa barbacoa',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'gluten', 'soja', 'dioxido-azufre']
    },
    {
      id: '3',
      name: 'Coca Cola',
      price: 1.25,
      img: 'assets/coca.png',
      familyId: '2',
      description: 'Coca Cola 1.5L',
      customizations: [],
      customizationQuestions: [],
      allergens: ['dioxido-azufre']
    },
    {
      id: '4',
      name: 'Fanta',
      price: 1,
      img: 'assets/fanta.png',
      familyId: '2',
      description: 'Fanta 1.5L',
      customizations: [],
      customizationQuestions: [],
      allergens: ['dioxido-azufre']
    },
    {
      id: '5',
      name: 'Hamburguesa',
      price: 8.95,
      img: 'assets/burguer.png',
      familyId: '3',
      description: 'Hamburguesa con queso',
      customizations: [],
      customizationQuestions: [],
      allergens: ['gluten', 'lactosa', 'huevos']
    },
    {
      id: '6',
      name: 'Papas',
      price: 2.30,
      img: 'assets/papas.png',
      familyId: '3',
      description: 'Papas fritas',
      customizations: [],
      customizationQuestions: [],
      allergens: []
    },
    {
      id: '7',
      name: 'Helado',
      price: 3.50,
      img: 'assets/helado.png',
      familyId: '4',
      description: 'Helado de chocolate',
      customizations: [],
      customizationQuestions: [],
      allergens: ['lactosa', 'cascara']
    },
    {
      id: '8',
      name: 'Brownie',
      price: 4.40,
      img: 'assets/brownie.png',
      familyId: '4',
      description: 'Brownie de chocolate',
      customizations: [],
      customizationQuestions: [],
      allergens: ['gluten', 'lactosa', 'huevos', 'cascara', 'cacahuetes']
    }
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(private http: HttpClient,
    private familyService: FamilyService,
    private dialog: MatDialog
  ) {}

  getProductsObservable(): Observable<Product[]> {
    return this.http.get<Product[]>(`${AppConfig.API_URL}/articulos`);
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductsData(): ProductData[] {
    const productsData: ProductData[] = [];

    console.log(this.products);
  
    // Agregar productos normales
    this.products.forEach(product => {
      productsData.push({
        id: product.id,
        productType: 'Producto',
        name: product.name,
        family: this.familyService.getFamilyName(product.familyId), // Función que recupera el nombre de la familia a partir del ID
        status: product.status!,
        allergens: product.allergens,
        type: 'producto',
      });
  
      // Agregar grupos de modificadores
      product.customizationQuestions.forEach(question => {
        productsData.push({
          id: question.id,
          productType: 'Grupo de modificadores',
          name: question.name,
          family: product.name, // El nombre del producto asociado
          status: product.status!,
          allergens: [], // Los grupos no tienen alérgenos
          type: 'producto',
        });
  
        // Agregar modificadores
        question.options.forEach(option => {
          productsData.push({
            id: option.id,
            productType: 'Modificador',
            name: option.value,
            family: question.name, // El texto de la pregunta
            status: product.status!,
            allergens: [], // Los modificadores no tienen alérgenos
            type: 'producto',
          });
        });
      });
    });
  
    return productsData;
  }

  addProduct(product: any) : Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/articulo`, product);
  }

  addCustomizationQuestion(question: any) : Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/pregunta`, question);
  }
  
  addOption(option: any) : Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/opcion`, option);
  }

  getTotalPrice(product: Product | Menu): number {
    console.log('Precio producto: ', product.price);
    let totalPrice = Number(product.price);

    product.customizations.forEach((customization) => {
      customization.responses.forEach((response) => {
        response.price = response.price || 0;
        totalPrice += Math.round(response.price! * 100) / 100;
      });
    });

    //Devolverlo con dos decimales aproximados
    return Math.round(totalPrice * 100) / 100;
  }

  // Obtener productos filtrados por ID de familia
  getProductsByFamilyId(id: string): Product[] {
    return this.products.filter((product) => product.familyId === id);
  }

  getNumberOfProductsByFamilyId(id: string): number {
    return this.getProductsByFamilyId(id).length;
  }

  getProductByIdAndType(productType: string, id: string): Observable<Product> {
    return this.http.get<Product>(`${AppConfig.API_URL}/articulo/${productType}/${id}`);
  }

  openProductModal(product: any = null): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        console.log('ID del producto:', product.id);
        if (product.id) {
          this.updateProductData(product.id, result);
        } else {
          this.addProductData(result);
        }
        this.dataSource = new MatTableDataSource<any>(this.getProductsData());
      }
    });
  }

  getProductById(id: string, productType: string): Observable<Product> {
    return this.http.get<Product>(`${AppConfig.API_URL}/articulo/${productType}/${id}`);
  }

  addProductData(productData: any) {
    // Generar un ID único corto para el nuevo producto
    const newId = (this.products.length + 1).toString();

    switch (productData.productType) {
      case 'Producto':
        // Crear un nuevo producto a partir de los datos del formulario
        this.createProduct(newId, productData);
        break;
      case 'Grupo de modificadores':
        // Crear un nuevo grupo de modificadores a partir de los datos del formulario
        this.createCustomizationQuestion(newId, productData);
        break;
      case 'Modificador':
        // Crear un nuevo modificador a partir de los datos del formulario
        this.createOption(newId, productData);
        break;
      }
  
  }

  createProduct(newId : string, productData: any) {
    const newProduct = {
      id: newId,
      name: productData.name,
      price: parseFloat(productData.price_1),
      img: 'assets/burguer_barbacoa.png', // La URL de la imagen que ya has obtenido
      familyId: productData.family, // Asumiendo que family es un ID o nombre que usas
      description: productData.description,
      iva: productData.iva,
      status: productData.status,
      customizations: [],
      customizationQuestions: [],
      allergens: this.getSelectedAllergens(productData.allergens) // Llama a la función para obtener alérgenos seleccionados
    };
  
    // Agregar el nuevo producto al array de productos
    this.products.push(newProduct);
    this.addProduct(newProduct).subscribe(
      {
        next: (response) => {
          console.log('Producto añadido correctamente', response);
        },
        error: (error) => {
          console.error('Error al añadir producto', error);
        }
      }
    );
  }

  createCustomizationQuestion(newId : string, productData: any) {
    const newCustomizationQuestion = {
      id: newId,
      name: productData.name,
      productId: productData.family, // Asumiendo que family es el ID del producto asociado
      status: productData.status === 'Habilitado' ? 1 : 0,
      questionType: productData.max === '1' ? 'single' : 'multiple',
      description: productData.description,
      max: parseInt(productData.max),
      min: parseInt(productData.min),
    };

    // Agregar el nuevo grupo de modificadores al array de productos
    this.addCustomizationQuestion(newCustomizationQuestion).subscribe(
      {
        next: (response) => {
          console.log('Grupo de modificadores añadido correctamente', response);
        },
        error: (error) => {
          console.error('Error al añadir grupo de modificadores', error);
        }
      });
  }

  createOption(newId : string, productData: any) {
    let img = productData.name === 'Sin nata' ? 'assets/no.png' : 'assets/nata.png';

    const newOption = {
      id: newId,
      name: productData.name,
      price: parseFloat(productData.price_1),
      img: img, 
      status: productData.status === 'Habilitado' ? 1 : 0,
      questionId: productData.family, 
      description: productData.description,
      iva: productData.iva,
    };
  
    this.addOption(newOption).subscribe(
      {
        next: (response) => {
          console.log('Producto añadido correctamente', response);
        },
        error: (error) => {
          console.error('Error al añadir producto', error);
        }
      }
    );
  }

  updateProductData(productId: number, productData: any) {

    switch (productData.productType) {
      case 'Producto':
        // Crear un nuevo producto a partir de los datos del formulario
        this.updateProduct(productId, productData);
        break;
      case 'Grupo de modificadores':
        // Crear un nuevo grupo de modificadores a partir de los datos del formulario
        this.updateCustomizationQuestion(productId, productData);
        break;
      case 'Modificador':
        // Crear un nuevo modificador a partir de los datos del formulario
        this.updateOption(productId, productData);
        break;
      }
  }

  updateProduct(productId: number, productData: any) {

  }

  updateCustomizationQuestion(productId: number, productData: any) {
    
  }

  updateOption(productId: number, productData: any) {

  }

    // Función para obtener los alérgenos seleccionados como un array de strings
  private getSelectedAllergens(allergens: boolean[]): string[] {
    const allergenNames = [
      'gluten', 'lactosa', 'altramuces', 'huevos',
      'apio', 'cacahuetes', 'crustaceos', 'cascara',
      'mostaza', 'pescado', 'sesamo', 'soja',
      'dioxido-azufre', 'moluscos'
    ];
  
    return allergens
      .map((selected, index) => (selected ? allergenNames[index] : ''))
      .filter((allergen) => allergen !== null);
  }

  openDeleteProductModal(product: any): void {
    // Lógica para abrir el modal de confirmación de eliminación
    console.log('Eliminar producto', product);
  }
}
