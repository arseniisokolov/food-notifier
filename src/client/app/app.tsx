import React, { useEffect, useState } from 'react';
import './app.css';

const TODAY_SHARE_ENDPOINT = (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '') + '/shop/today-share';

export const App = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, setErrorStatus] = useState<boolean>(false);
    const [share, setShare] = useState<Share>();

    const fetchTodayShare = async () => {
        setLoading(true);
        try {
            const response = await fetch(TODAY_SHARE_ENDPOINT);
            const body: Share = await response.json();
            setShare(body);
            setErrorStatus(false);
        } catch (err) {
            setErrorStatus(true);
        } finally {
            setLoading(false);
        }
    }

    const updateShareData = async () => {
        setLoading(true);
        try {
            const response = await fetch(TODAY_SHARE_ENDPOINT, { method: 'POST' });
            const body: Share = await response.json();
            setShare(body);
            setErrorStatus(false);
        } catch (err) {
            setErrorStatus(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTodayShare();
    }, []);

    if (isLoading) {
        return (<main className='page'><strong>⏳Загружаем...</strong></main>);
    }

    if (hasError) {
        return (<main className='page'><strong>😢Произошла ошибка</strong></main>);
    }

    if (!share) {
        return null;
    }

    const good = share.goods[0];
    const date = share && `${new Date(share.dates[0]).toLocaleDateString()}, ${new Date(share.dates[0]).toLocaleTimeString()}`;

    return (
        <main className='page'>
            {
                share ? (
                    <article>
                        <h1>🥭 Акции Вкусвилла</h1>
                        <button type='submit' className="page__refresh-btn" onClick={updateShareData}>Проверить обновления</button>
                        <section className="action">
                            <h2 className="action__title">🎁 Товар дня (новогодняя)</h2>
                            <p>За дату: {date}</p>
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
