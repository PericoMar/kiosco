# TODO:

Prioridades antes de FEBRERO:

Kiosko:
- [] Meter alergenos en el kiosco.
- [] Cambiar idiomas por formas de pago (Las tarjetas que acepta DOJO) 
    como los idiomas aún no funcionan habria que quitarlos y poner algo en su lugar

Panel de gestión:
- Gestión de usuarios
    - [] Generar los registros de los Usuarios
    - [] Comprobar login desde la BBDD
    - [] Mantener los datos del cliente en localStorage
- Cambios en BBDD
    - [] Crear tabla en BBDD Clientes/Establecimientos
        - nombre, email, telefono, estado_suscripcion, fecha_alta, fecha_baja, num_kioscos
    - Añadir diferenciador por cliente (cliente_id)
        - [] Tabla Kioscos
        - [] Tabla Familias
        - [] Tabla Impresoras
        - [] Tabla Usuarios
        - [] Tabla Productos
        - [] Recoger Familias por cliente
        - [] Recoger Productos por cliente

- Conexión de los dispositivos.
    - [] Gestión de rutas (Añadir el numero de serie del kiosco a la ruta)
    - [] Crear en BBDD Kioscos_Impresoras
    - En la pagina de dispositivos
        - Diferenciar impresoras
            - [] Estilos de la tabla
            - [] Recoger los registros
        - Diferenciar Datafonos
            - [] Estilos de la tabla
            - [] Recoger los registros
        - Difenreciar Kioscos
            - [] Estilos de la tabla
            - [] Recoger los registros
        - Modales de creación y edición
            - Modal de Kiosco (Formulario)
                - [] Nombre que le quiera poner el cliente al kiosco
                - [] Num. serie *
                - [] Datafono * (Selector por datafono, si no hay datafonos no poder acceder)
            - Modal de Datafono (Formulario)
                - [] Nombre que le quiera poner el cliente al datafono
                - [] TID
                - [] terminalId
    - Conectar Impresoras con Familias
        - [] Mandar a BBDD los datos a partir del modal.
        - [] Visión en la tabla

- Gestión de la impresión
    - [] Coger número de serie del kiosco 
    - Ticket cliente:
        - [] Recoger la impresora del kiosco
        - [] Generar PDF
        - [] Mandar impresión
    - Ticket cocina:
        - [] Recoger las impresoras conectadas con el kiosco
        - [] Generar el PDF a partir de las familias conectadas con cada Impresora.
        - [] Mandar orden de impresión

- Tickets
    - [] Crear tabla en BBDD Tickets
        - id, total, num_ticket, num_pedido, tipo_pedido ('Comer aquí', 'Para llevar'), paymentIntentId, estado, fecha, tienda_id, impuestos.
    - [] Crear tabla en BBDD Articulos_Tickets
        - id, articulo_id, ticket_id, cantidad
    - [] Generar registro en BBDD cada vez que se genera una venta
    - Tabla Tickets
        - [] Recoger registros.
        - [] Estilos de la tabla.

- Ordenar Familias.
    - [] Generar modal de ordenación
    - [] Mandar a BBDD el orden
    - [] Recoger de BBDD las familias en orden

- [] Configuración* 
    - [] Crear Tabla Configuración
        - Tarifa_seleccionada, logo_ticket, colores ...
    - Foto por defecto (Cuando un articulo no tiene foto) Foto por defecto por familia
    - ¿Tarifa seleccionada? 
        - Borde más oscuro para la que este en uso (En formulario creación)
        - Divisa
    - Formato del ticket.
        - [] Imagen del ticket
    - Publicidad.
    - Productos Favoritos.

- [] Posibilidad de añadir un Grupo de modificadores a una Familia entera
- [] Posibilidad de añadir un Modificador a todos los Grupos de modificadores que quiera

A partir de FEBRERO:
Kiosko:
- [] Idiomas

Panel de gestión
- [] Importación por Excel.
- Responsive:
    - [] Control de tamaño de las columnas en la tabla (p.e: Tipo de producto que tenga un minimo de with para que no se desconfigure el 'Grupo de modificadores').
    - [] Tabla para moviles (Con desplegable)
- Configuración:
    - Estilos. (Presentación)
        - [] Color secundario.
        - [] Modo oscuro.
        - [] Imagen de comer aquí, para llevar, datafono y logo.
        - [] Foto de perfil
    - [] Idiomas.
- [] Añadir filtros
- [] Vista para menu.
- [] Arreglar el click al label del checkbox en las opciones.
- [] Mejora carga de productos
