// Representa una personalización para un producto (e.g. salsa, punto de la carne)
export interface Customization {
    name: string;
    value: string;  // e.g. "Well done", "With ketchup"
    price?: number;  // Optional, may not have a price
}

// Represents a basic or unit product
export interface Product {
    id: string;
    name: string;
    img?: string;
    price: number;
    description: string;
    familyId: string;
    customizations?: Customization[];  // Opcional, puede no tener personalizaciones
}

// Representa un menú que puede tener varios productos
export interface Menu {
    id: number;
    name: string;
    img?: string;
    price: number;
    description: string;
    familyId: string;
    products: Product[];  // Productos que componen el menú
    customizations?: Customization[];  // Opcional, puede no tener personalizaciones
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