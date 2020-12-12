import React, { useEffect, useState } from 'react'

export const App = () => {

    const [foods, setFoods] = useState<string[]>([]);

    const fetchFoods = async () => {
        const response = await fetch('http://localhost:5000');
        const body: { foods: string[] } = await response.json();
        setFoods(body.foods);
        console.log(foods);
    }

    useEffect(() => {
        fetchFoods();
    }, []);

    console.log(foods);

    return (
        <div>
            {foods.map(food => <div>{food}</div>)}
        </div>
    );
};
