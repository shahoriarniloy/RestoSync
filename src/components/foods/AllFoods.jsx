import { useState, useEffect } from 'react';

const AllFoods = () => {
    const [topFoods, setTopFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/foods')
            .then(response => response.json())
            .then(data => {
                setTopFoods(data);
            })
            .catch(error => console.error('Error fetching top foods:', error));
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className='lg:text-4xl md:text-4xl text-xl text-center font-tittle mt-6 mb-6'>All Foods</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
                {topFoods.map(food => (
                    <div key={food._id} className="card card-compact bg-base-100 shadow-xl">
                        <figure className="h-64 w-full">
                            <img src={food.foodImage} alt={food.foodName} className="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{food.foodName}</h2>
                            <p>{food.shortDescription}</p>
                            <div className='flex justify-between'>
                                <p className='text-orange-700 font-paragraph'>Category: {food.foodCategory}</p>
                                <p className='text-green-600'>Price: ${food.price}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFoods;
