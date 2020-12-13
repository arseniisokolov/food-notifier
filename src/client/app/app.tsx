import React, { useEffect, useState } from 'react'

export const App = () => {

    const [product, setProduct] = useState<Product>();

    const fetchTodayPrice = async () => {
        const response = await fetch('/shop/today-price');
        const body: Product = await response.json();
        setProduct(body);
        console.log(product);
    }

    useEffect(() => {
        fetchTodayPrice();
    }, []);

    return (
        <div>
            {
                product ? (
                    <div>
                        <h1>Товар дня</h1>
                        <p> {product.caption}</p>
                        <p> {product.price}</p>
                        <img src={product.imgSrc} />
                    </div>
                ) : 'Нет информации'
            }
        </div>
    );
};
