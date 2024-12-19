export interface Dataphone {
    id : number,
    nombre : string,
    num_serie : string,
    TID : string,
    estado : string,
    zona: string,
    descripcion : string,
    supervisor : string,
    devoluciones : boolean // Si se usa para devoluciones o no (Si no se usa para devoluciones es un datafono de cobros)
    cliente_id: number
}
