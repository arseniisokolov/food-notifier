import React, { useEffect, useState } from 'react';
import './app.css';

const TODAY_SALES_GOOD_ENDPOINT = (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '') + '/shop/today-sales-good';

export const App = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, setErrorStatus] = useState<boolean>(false);
    const [good, setGood] = useState<Good>();

    const fetchTodayPrice = async () => {
        setLoading(true);
        try {
            const response = await fetch(TODAY_SALES_GOOD_ENDPOINT);
            const body: Good = await response.json();
            setGood(body);
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
        return (<main className='page'><strong>Загружаем...</strong></main>);
    }

    if (hasError) {
        return (<main className='page'><strong>Произошла ошибка</strong></main>);
    }

    return (
        <main className='page'>
            {
                good ? (
                    <article>
                        <h1>Акции Вкусвилла</h1>
                        <section className="action">
                            <h2 className="action__title">Товар дня (новогодняя)</h2>
                            <div className="action__body good">
                                <img className="good__img" src={good.imgSrc} />
                                <div>
                                    <p className="good__caption">{good.caption}</p>
                                    <p>Цена по акции: <strong>{good.salesPrice} руб.</strong></p>
                                    <p>Обычная цена: {good.price} руб.</p>
                                </div>
                            </div>


                        </section>
                    </article>
                ) : 'Нет информации'
            }
        </main>
    );
};
