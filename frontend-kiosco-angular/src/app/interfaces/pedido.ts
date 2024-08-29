// Representa una personalización para un producto (e.g. salsa, punto de la carne)
export interface CustomizationResponse {
    name?: string; // Nombre de la pregunta de personalización
    value: string; // Valor seleccionado por el cliente
    price?: number; // Opcional, puede no tener precio
}

// Representa una pregunta de personalización para un producto (e.g., salsa, punto de la carne)
export interface CustomizationQuestion {
    name: string; // e.g., "Nivel de cocción", "Tipo de salsa"
    options: CustomizationOption[]; // Opciones disponibles para esta pregunta
}

export interface CustomizationOption {
    id: string; // Opcional, puede no tener id
    value: string; // e.g., "Well done", "With ketchup"
    img?: string; // Opcional, puede no tener imagen
    price?: number; // Opcional, puede no tener precio
}


// Represents a basic or unit product
export interface Product {
    id: string;
    name: string;
    price: number;
    img?: string;
    familyId: string;
    description: string;
    customizations: CustomizationResponse[];  // Opcional, puede no tener personalizaciones
    customizationQuestions?: CustomizationQuestion[];  // Opcional, puede no tener preguntas de personalización
}

// Representa un menú que puede tener varios productos
export interface Menu {
    id: number;
    name: string;
    price: number;
    img?: string;
    familyId: string;
    description: string;
    products: Product[];  // Productos que componen el menú
    customizations?: CustomizationResponse[];  // Opcional, puede no tener personalizaciones
    customizationQuestions?: CustomizationQuestion[];  // Opcional, puede no tener preguntas de personalización
}

// Representa un ítem de pedido que puede ser un producto o un menú
export interface OrderItem {
    type: 'product' | 'menu';
    quantity: number;
    details: Product | Menu;
}

// Representa un pedido que contiene varios items (productos y/o menús)
export interface Order {
    id: number;
    items: OrderItem[];
    total: number;
    date: Date;
    consumptionOption: string;
    paymentMethod: string;
}