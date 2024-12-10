import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomizationOption, CustomizationQuestion, Product } from '../interfaces/pedido';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { AppConfig } from '../../config/app-config';
import { FamilyService } from './family.service';
import { ProductData } from '../interfaces/product-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../pages/layouts/management-panel/modals/product-modal/product-modal.component';
import { SnackbarService } from './snackBar/snackbar.service';
import { DeleteModalComponent } from '../pages/layouts/management-panel/modals/delete-modal/delete-modal.component';
import { ImageService } from './image/image.service';




@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // public products: Product[]
  // = [
  //   {
  //     id: '1',
  //     name: 'Muzzarella',
  //     price: 10.75,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     taxes: 10,
  //     description: 'Muzzarella, tomate y aceitunas',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten']
  //   },
  //   {
  //     id: 'p1',
  //     name: 'Hamburguesa especial',
  //     img: 'assets/burguer.png',
  //     price: 12.99,
  //     description: 'Una deliciosa hamburguesa con ingredientes frescos y personalizables.',
  //     familyId: '1',
  //     customizations: [],
  //     customizationQuestions: [
  //       {
  //         id: 'pan',
  //         name: '¿Qué tipo de pan prefieres?',
  //         questionType: 'single',
  //         minChoices: 1,
  //         options: [
  //           { id: 'pan-avena', value: 'Pan de avena', price: 0, img: 'assets/pan.png' },
  //           { id: 'pan-integral', value: 'Pan integral', price: 0.5, img: 'assets/pan.png' },
  //           { id: 'pan-brioche', value: 'Pan brioche', price: 1.0, img: 'assets/pan.png' },
  //           { id: 'pan-cereales', value: 'Pan cereales', price: 1.5, img: 'assets/pan.png' },
  //           { id: 'pan-tostado', value: 'Pan tostado', price: 0, img: 'assets/pan.png' }
  //         ],
  //       },
  //       {
  //         id: 'carne',
  //         name: '¿Qué nivel de cocción deseas?',
  //         questionType: 'single',
  //         minChoices: 1,
  //         options: [
  //           { id: 'poco-hecho', value: 'Poco hecho', price: 0 },
  //           { id: 'en-su-punto', value: 'En su punto', price: 0 },
  //           { id: 'bien-hecho', value: 'Bien hecho', price: 0.5 }
  //         ],
  //       },
  //       {
  //         id: 'extra',
  //         name: 'Añade algún extra:',
  //         questionType: 'multiple',
  //         minChoices: 0,
  //         maxChoices: 2,
  //         options: [
  //           { id: 'bacon', value: 'Bacon', price: 1.5 },
  //           { id: 'aguacate', value: 'Aguacate', price: 1.0 },
  //           { id: 'champinones', value: 'Champiñones', price: 0.7 }
  //         ],
  //       },
  //     ],
  //     allergens: ['gluten', 'lactosa', 'soja']
  //   },
  //   {
  //     id: '2',
  //     name: 'Fugazzeta',
  //     price: 9.75,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Fugazzeta con cebolla y queso',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa']
  //   },
  //   {
  //     id: '9',
  //     name: 'Napolitana',
  //     price: 11.75,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, tomate y ajo',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten']
  //   },
  //   {
  //     id: '10',
  //     name: 'Calabresa',
  //     price: 10,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella y calabresa',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten', 'mostaza']
  //   },
  //   {
  //     id: '11',
  //     name: 'Cuatro Quesos',
  //     price: 10.75,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, provolone, roquefort y parmesano',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten']
  //   },
  //   {
  //     id: '12',
  //     name: 'Hawaiana',
  //     price: 10,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, jamón y ananá',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten', 'soja']
  //   },
  //   {
  //     id: '13',
  //     name: 'Pepperoni',
  //     price: 10.30,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella y pepperoni',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten', 'soja']
  //   },
  //   {
  //     id: '14',
  //     name: 'Vegetariana',
  //     price: 8,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, pimientos, cebolla, aceitunas y champiñones',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten', 'soja', 'sesamo']
  //   },
  //   {
  //     id: '15',
  //     name: 'Margherita',
  //     price: 10.30,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, tomate y albahaca',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten']
  //   },
  //   {
  //     id: '16',
  //     name: 'Barbacoa',
  //     price: 12,
  //     img: 'assets/pizza.png',
  //     familyId: '1',
  //     description: 'Muzzarella, carne, cebolla y salsa barbacoa',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'gluten', 'soja', 'dioxido-azufre']
  //   },
  //   {
  //     id: '3',
  //     name: 'Coca Cola',
  //     price: 1.25,
  //     img: 'assets/coca.png',
  //     familyId: '2',
  //     description: 'Coca Cola 1.5L',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['dioxido-azufre']
  //   },
  //   {
  //     id: '4',
  //     name: 'Fanta',
  //     price: 1,
  //     img: 'assets/fanta.png',
  //     familyId: '2',
  //     description: 'Fanta 1.5L',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['dioxido-azufre']
  //   },
  //   {
  //     id: '5',
  //     name: 'Hamburguesa',
  //     price: 8.95,
  //     img: 'assets/burguer.png',
  //     familyId: '3',
  //     description: 'Hamburguesa con queso',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['gluten', 'lactosa', 'huevos']
  //   },
  //   {
  //     id: '6',
  //     name: 'Papas',
  //     price: 2.30,
  //     img: 'assets/papas.png',
  //     familyId: '3',
  //     description: 'Papas fritas',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: []
  //   },
  //   {
  //     id: '7',
  //     name: 'Helado',
  //     price: 3.50,
  //     img: 'assets/helado.png',
  //     familyId: '4',
  //     description: 'Helado de chocolate',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['lactosa', 'cascara']
  //   },
  //   {
  //     id: '8',
  //     name: 'Brownie',
  //     price: 4.40,
  //     img: 'assets/brownie.png',
  //     familyId: '4',
  //     description: 'Brownie de chocolate',
  //     customizations: [],
  //     customizationQuestions: [],
  //     allergens: ['gluten', 'lactosa', 'huevos', 'cascara', 'cacahuetes']
  //   }
  // ];

  dataSource!: MatTableDataSource<any>;

  constructor(private http: HttpClient,
    private familyService: FamilyService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private imageService: ImageService
  ) {}

  private PRODUCTS_LOCAL_STORAGE_KEY = 'products';

  private productChangedSource = new Subject<any>();
  productChanged$ = this.productChangedSource.asObservable();

  keyExists(key: string = 'products'): boolean {
    return localStorage.getItem(key) !== null;
  }

  get products(): Product[] {
    return JSON.parse(localStorage.getItem(this.PRODUCTS_LOCAL_STORAGE_KEY) || '[]');
  }

  set products(products: Product[]) {
    localStorage.setItem(this.PRODUCTS_LOCAL_STORAGE_KEY, JSON.stringify(products));
  }

  // Método para emitir cambios
  emitProductChange(changes: any): void {
    this.productChangedSource.next(changes);
  }

  getProductsObservable(): Observable<Product[]> {
    return this.http.get<Product[]>(`${AppConfig.API_URL}/articulos`)
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
        family: this.familyService.getFamilyName(product.familyId),
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
            allergens: option.allergens!, // Los modificadores no tienen alérgenos
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

  getTotalPrice(product: Product): number {
    let totalPrice = Number(product.prices[0]);

    product.customizations.forEach((customization) => {
      customization.responses.forEach((response) => {
        response.prices[0] = response.prices[0] || 0;
        totalPrice += Math.round(response.prices[0]! * 100) / 100;
      });
    });

    //Devolverlo con dos decimales aproximados
    return Math.round(totalPrice * 100) / 100;
  }

  getTax(product: Product): number {
    return Math.round(product.prices[0] * product.taxes!) / 100;
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

  getProductById(id: string, productType: string): Observable<Product> {
    return this.http.get<Product>(`${AppConfig.API_URL}/articulo/${productType}/${id}`);
  }

  getProductByOptionId(optionId: string): Observable<Product> {
    return this.http.get<Product>(`${AppConfig.API_URL}/articulo/opcion/${optionId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/articulo/${productId}`);
  }
  
  deleteCustomizationQuestion(productId: number): Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/pregunta/${productId}`);
  }
  
  deleteOption(productId: number): Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/opcion/${productId}`);
  }

  updateProduct(productId: number, productData: any) {
    return this.http.put(`${AppConfig.API_URL}/articulo/${productId}`, productData);
  }

  updateCustomizationQuestion(productId: number, productData: any) {
    return this.http.put(`${AppConfig.API_URL}/pregunta/${productId}`, productData);
  }

  updateOption(productId: number, productData: any) {
    return this.http.put(`${AppConfig.API_URL}/opcion/${productId}`, productData);
  }

  openProductModal(product: any = null): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',
      data: { ...product }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        if (product?.id) {
          this.updateProductData(product.id, result);
        } else {
          this.addProductData(result);
        }
      }
    });
  }
  

  

  addProductData(productData: any) {
    const newId = (this.products.length + 1).toString();
  
    let createMethod: any;
    let addMethod: any;
    let type: string;
  
    switch (productData.productType) {
      case 'Producto':
        createMethod = this.createProduct;
        addMethod = this.addProduct;
        type = 'producto';
        break;
      case 'Grupo de modificadores':
        createMethod = this.createCustomizationQuestion;
        addMethod = this.addCustomizationQuestion;
        type = 'grupo de modificadores';
        break;
      case 'Modificador':
        createMethod = this.createOption;
        addMethod = this.addOption;
        type = 'modificador';
        break;
    }
  
    const newItem = createMethod.call(this, newId, productData);
  
    addMethod.call(this, newItem)
      .pipe(
        switchMap((response : any) => {
          console.log(`${type} añadido correctamente`, response);

          this.addToLocalStorage(type, response.articulo.id, newItem, productData.family);
  
          // Verificar si hay imagen para subir
          return productData.img && productData.img instanceof File
            ? this.imageService.uploadImage('Articulos', response.articulo.id, 'imagen', productData.img)
            : of(null); // Observable vacío si no hay imagen
        })
      )
      .subscribe({
        next: (uploadResponse : any) => {
          if (uploadResponse) {
            console.log('Imagen subida correctamente', uploadResponse);
          }
          this.snackbarService.openSnackBar(
            `${type.charAt(0).toUpperCase() + type.slice(1)} añadido correctamente`,
            'Cerrar',
            3000,
            ['custom-snackbar', 'success-snackbar']
          );
          this.emitProductChange({ type });
        },
        error: (error : any) => {
          console.error(`Error al añadir ${type}:`, error);
        }
      });
  }
  
  updateProductData(productId: number, productData: any) {
    let createMethod: any;
    let updateMethod: any;
    let type: string;
  
    switch (productData.productType) {
      case 'Producto':
        createMethod = this.createProduct;
        updateMethod = this.updateProduct;
        type = 'producto';
        break;
      case 'Grupo de modificadores':
        createMethod = this.createCustomizationQuestion;
        updateMethod = this.updateCustomizationQuestion;
        type = 'grupo de modificadores';
        break;
      case 'Modificador':
        createMethod = this.createOption;
        updateMethod = this.updateOption;
        type = 'modificador';
        break;
    }
  
    const updatedItem = createMethod.call(this, productId.toString(), productData);

    console.log('updatedItem', updatedItem);
  
    updateMethod.call(this, productId, updatedItem)
      .pipe(
        switchMap((response : any) => {
          console.log(`${type} actualizado correctamente`, response);          

          // Verificar si hay imagen para subir
          return productData.img && productData.img instanceof File
          // Si es un Modificador el response.id es de la tabla Articulos no de la tabla OpcionesPreguntasArticulo
            ? this.imageService.uploadImage('Articulos', response.id , 'imagen', productData.img)
            : of(null); // Observable vacío si no hay imagen
        })
      )
      .subscribe({
        next: (uploadResponse : any) => {
          if (uploadResponse) {
            console.log('Imagen subida correctamente', uploadResponse);
          }
          this.snackbarService.openSnackBar(
            `${type.charAt(0).toUpperCase() + type.slice(1)} actualizado correctamente`,
            'Cerrar',
            3000, 
            ['custom-snackbar', 'success-snackbar']
          );
          this.emitProductChange({ type });
        },
        error: (error : any) => {
          console.error(`Error al actualizar ${type}:`, error);
        }
      });
  }
  

  openDeleteProductModal(product: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productType: product.productType, name: product.name, id: product.id, familyId: product.family }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);

        let deleteObservable;
  
        switch (product.productType) {
          case 'Producto':
            deleteObservable = this.deleteProduct(product.id);
            break;
          case 'Grupo de modificadores':
            deleteObservable = this.deleteCustomizationQuestion(product.id);
            break;
          case 'Modificador':
            deleteObservable = this.deleteOption(product.id);
            break;
        }
  
        if (deleteObservable) {
          deleteObservable.subscribe({
            next: () => {
              // Llamar a la función correspondiente para borrar del localStorage
              this.deleteFromLocalStorage(result.data);
  
              this.snackbarService.openSnackBar(
                `${product.productType} eliminado con éxito`,
                'Cerrar',
                3000,
                ['custom-snackbar', 'success-snackbar']
              );
              this.emitProductChange({ type: product.productType });
            },
            error: (err) => {
              console.error(`Error al eliminar ${product.productType}:`, err);
              // Maneja el error, por ejemplo, mostrando una alerta o mensaje de error al usuario
            }
          });
        }
      }
    });
  }
  
  // Función para borrar del localStorage según el tipo de producto
  private deleteFromLocalStorage(product: any): void {
    switch (product.productType) {
      case 'Producto':
        this.deleteProductFromLocalStorage(product.id);
        break;
      case 'Grupo de modificadores':
        this.deleteCustomizationQuestionFromLocalStorage(product.id);
        break;
      case 'Modificador':
        this.deleteOptionFromLocalStorage(product.id);
        break;
    }
  }
  
  // Implementaciones específicas para borrar del localStorage
  private deleteProductFromLocalStorage(productId: string): void {
    this.products = this.products.filter(product => product.id !== productId);
  }
  
  private deleteCustomizationQuestionFromLocalStorage(questionId: string): void {
    console.log('products antes', this.products);
    console.log('questionId', questionId);

    this.products = this.products.map(product => {
        return {
            ...product,
            customizationQuestions: product.customizationQuestions.filter(
                question => question.id !== questionId
            )
        };
    });

    console.log('products después', this.products);
  }

  private deleteOptionFromLocalStorage(optionId: string): void {
    console.log('products antes', this.products);
    console.log('optionId', optionId);

    this.products = this.products.map(product => {
        const updatedQuestions = product.customizationQuestions.map(question => {
            return {
                ...question,
                options: question.options.filter(option => option.id !== optionId)
            };
        });

        return {
            ...product,
            customizationQuestions: updatedQuestions
        };
    });

    console.log('products después', this.products);
  }
  
  addToLocalStorage(type: string, id: any, data: any, familyId: any) {
    console.log('Añadir al localStorage', type, id, data, familyId);
    data.id = id;
    // Dependiendo del tipo (producto, grupo de modificadores, modificador) se debe actualizar el array correspondiente
    switch (type) {
      case 'producto':
        this.addProductToLocalStorage(data);
        break;
      case 'grupo de modificadores':
        this.addCustomizationQuestionToLocalStorage(data, familyId);
        break;
      case 'modificador':
        this.addCustomizationOptionToLocalStorage(data, familyId);
        break;
    }

  }

  addProductToLocalStorage(product: Product): void {
    const products = this.products;
    product = this.transformProductData([product])[0];

    products.push(product);

    console.log('products', products);
    this.products = products;
  }

  transformProductData(rawProducts: any[]): Product[] {
    return rawProducts.map(product => ({
        allergens: Array.isArray(product.allergens)
            ? product.allergens.filter((allergen : any) => allergen.trim() !== "")
            : [],
        customizationQuestions: product.customizationQuestions || [],
        customizations: product.customizations || [],
        description: product.description ? product.description : null,
        familyId: product.familyId?.toString() || "",
        id: product.id?.toString() || "",
        img: product.img ? product.img : null,
        name: product.name || "Sin nombre",
        prices: [
            ...(product.price_1 ? [product.price_1.toString()] : []),
            ...(product.price_2 ? [product.price_2.toString()] : []),
            ...(product.price_3 ? [product.price_3.toString()] : []),
        ],
        status: product.status === 1 ? "Habilitado" : "Deshabilitado",
        taxes: product.iva?.toString() || "0"
    }));
}

  addCustomizationQuestionToLocalStorage(question: CustomizationQuestion, productId: any): void {
    const products = this.products;
    const productIndex = products.findIndex((product) => product.id === productId);
    products[productIndex].customizationQuestions.push(question);
    this.products = products;
  }

  addCustomizationOptionToLocalStorage(option: CustomizationOption, customizationQuestionId: string): void {
    const products = this.products;
  
    // Recorrer los productos para encontrar la pregunta
    for (const product of products) {
      const question = product.customizationQuestions.find(q => q.id === customizationQuestionId);
      
      if (question) {
        // Verificar si la opción ya existe
        const optionExists = question.options.some(o => o.id === option.id);
  
        if (!optionExists) {
          // Agregar la nueva opción
          question.options.push(option);
          console.log(`Opción añadida a la pregunta "${question.name}" del producto "${product.name}".`);
        } else {
          console.log(`La opción ya existe en la pregunta "${question.name}".`);
        }
        
        // Finalizar el bucle ya que hemos encontrado y actualizado
        break;
      }
    }
  
    // Opcional: Actualizar localStorage si se usa para persistencia
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  createProduct(id : string, productData: any) {
    const newProduct = {
      id,
      name: productData.name,
      price_1: parseFloat(productData.price_1),
      price_2: parseFloat(productData.price_2),
      price_3: parseFloat(productData.price_3),
      familyId: productData.family, // Asumiendo que family es un ID o nombre que usas
      description: productData.description,
      iva: productData.iva,
      status: productData.status === 'Habilitado' ? 1 : 0,
      customizations: [],
      customizationQuestions: [],
      allergens: this.getSelectedAllergens(productData.allergens) // Llama a la función para obtener alérgenos seleccionados
    };
    
    return newProduct;
  }

  createCustomizationQuestion(id : string, productData: any) {
    const newCustomizationQuestion = {
      id,
      name: productData.name,
      productId: productData.family, // Asumiendo que family es el ID del producto asociado
      status: productData.status === 'Habilitado' ? 1 : 0,
      questionType: productData.max === '1' ? 'single' : 'multiple',
      description: productData.description,
      max: parseInt(productData.max),
      min: parseInt(productData.min),
    };

    return newCustomizationQuestion;
  }

  createOption(id : string, productData: any) {

    const newOption = {
      id,
      name: productData.name,
      price_1: parseFloat(productData.price_1),
      price_2: parseFloat(productData.price_2),
      price_3: parseFloat(productData.price_3),
      status: productData.status === 'Habilitado' ? 1 : 0,
      questionId: productData.family, 
      description: productData.description,
      iva: productData.iva,
      allergens: this.getSelectedAllergens(productData.allergens)
    };
  
    return newOption;
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
  
}
