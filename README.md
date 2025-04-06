### Proyecto desplegado: https://tienda-pokemons.vercel.app/

# TiendaPokemons
│ ├── └── 
## Estructura Proyecto
```
my-react-app/
│
├── public/
│   └── images/
│       └── favicon.png
│
└── src/
    ├── components/
    │   ├── Boton.js
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── NavBar.js
    │   ├── Product.js
    │   └── ProductsCart.js
    │ 
    ├── pages/
    │   ├── Cart.js
    │   ├── Home.js
    │   └── Checkout.js
    │
    ├── App.js
    └── index.js
```

# TiendaPokemon 

DOCUMENTACIÓN
PÁGINAS:
## `Home.js` 

 - Catalogo productos con todos los pokémons disponibles en la tienda, utiliza el `useEffect` para cargar la API y sucesivamente los guarda en el LocalStorage.
 - Cuando añades los productos al carrito, se guardan en el LocalStorage. Si un producto ya ha sido añadido al carrito, se suma la cantidad, sino se añade por completo.

 ## `Cart.js`

- Si el carrito está vacío sale un texto y un botón para volver al catalogo.
- Muestra todos los productos en el carrito.
- Puedes añadir o quitar cantidad, o quitar definitavemente un producto del carrito.
- Boton para realizar la compra.

# `Checkout.js`

- Muestra el total de la compra.
- Hay un botón para llevarte otra vez a la página inicial.

COMPONENTS:

## `Boton.js`

## `Footer.js`

## `Header.js`

## `NavBar.js`
- Puedes ir a la página inicial o al carrito.

## `Product.js`
- Se utiliza el `useEffect` para establecer precios random a los Pokemons. Luego se guardan en el LocalStorage, de forma que cada vez que se actualize la página se queden siempre los mismos.
- La card de cada producto está estilizada con `BootStrap`.

## `ProductsCart.js`

### Funciones:
- **deleteBuy** = Se elimina el Pokemon indicado y se actualiza el `cart` en el LocalStorage.
- **countingTotal** = Se calcula el total del carrito.
- **removeItem** = Se disminuye la cantidad de un determinado producto.
- **addItem** = Se incrementa la cantidad de un determinado producto.
