import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../Theme';
import { Helmet } from 'react-helmet';

const CategoryFoods = () => {
    const { darkTheme } = useTheme();
    const { categoryName } = useParams();
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch(`https://resturant-pied-eta.vercel.app/foods/category/${categoryName}`)
            .then(response => response.json())
            .then(data => setFoods(data))
            .catch(error => console.error('Error fetching foods:', error));
    }, [categoryName]);

    return (
        <div className={`container mx-auto ${darkTheme ? 'text-white bg-black' : 'text-black bg-base'}`}>
            <Helmet>
                <title>{categoryName} Foods</title>
            </Helmet>
            <div className="lg:text-4xl md:text-4xl text-orange-500 text-xl text-center font-tittle mt-6 mb-6">
                {categoryName} Foods
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                {foods.map((food) => (
                    <div key={food._id} className={`card card-compact shadow-xl ${darkTheme ? 'text-white bg-gray-600' : ''}`}>
                        <figure className="h-64 w-full">
                            <img src={food.foodImage} alt={food.foodName} className="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-tittle">{food.foodName}</h2>
                            {food.quantity === 0 ? (
                                <p className='btn w-full text-white bg-red-500 border-none'>Not Available</p>
                            ) : (
                                <p className='btn w-full text-white border-none bg-green-600 font-paragraph'>Available: <span className='font-tittle text-lg font-bold'>{food.quantity}</span></p>
                            )}
                            <p>{food.shortDescription}</p>
                            <div className='flex justify-between'>
                                <p className='btn text-blue-600 font-paragraph mr-2'>Category: {food.foodCategory}</p>
                                <p className='btn text-pink-600 mr-2'>Price: ${food.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFoods;
