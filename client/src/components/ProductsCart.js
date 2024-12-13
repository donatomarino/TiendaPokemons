// Un componente que representa un solo producto
export default function ProductsCart({prod, quantity}) {

    return (
        <div>
            <h2 id='title-cart'>Cart</h2>
            {prod 
                ? prod.map((p) => {
                    console.log("hola")
                    return (
                        <div className="products-cart">
                            <h3>{p} x {quantity}</h3>
                            {/* <img src = {p[1]}></img> */}
                        </div>
                    )

            }) : ""}

        </div>
    );
}