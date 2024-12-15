import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";

export default function Product({url, up, name, addToCart }) {
    const [precio, setPrecio] = useState();
    
    useEffect(() =>{
        setPrecio(Math.floor(Math.random() * (100 - 10) + 10));
    }, [])

    return (
        <Card
            bg="danger"
            style={{ width: '18rem', margin: '10px', textAlign: 'center' }}
            className="card-product"
        >
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{up(name)}</Card.Title>
                <Card.Text>Precio: {precio} €</Card.Text>
                <Button
                    variant="warning"
                    onClick={() => addToCart([name, precio])}
                > Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}