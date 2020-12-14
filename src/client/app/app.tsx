import React, { useEffect, useState } from 'react';
import './app.css';

const PRICE_ENDPOINT = (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '') + '/shop/today-price';

export const App = () => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setErrorStatus] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();

    const fetchTodayPrice = async () => {
        setLoading(true);
        try {
            const response = await fetch(PRICE_ENDPOINT);
            const body: Product = await response.json();
            setProduct(body);
            setErrorStatus(false);
        } catch (err) {
            setErrorStatus(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTodayPrice();
    }, []);

    if (isLoading) {
        return (<div>Загружаем...</div>);
    }

    if (isError) {
        return (<div>Произошла ошибка</div>);
    }

    return (
        <main className='page'>
            {
                product ? (
                    <article>
                        <h1>Товар дня</h1>
                        <p> {product.caption}, {product.price} руб.</p>
                        <img src={product.imgSrc} />
                    </article>
                ) : 'Нет информации'
            }
        </main>
    );
};
