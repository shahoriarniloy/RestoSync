import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllFoods = () => {
    const [topFoods, setTopFoods] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/foods')
            .then(response => response.json())
            .then(data => {
                setTopFoods(data);
            })
            .catch(error => console.error('Error fetching top foods:', error));
    }, []);

    const handleSearchInputChange = event => {
        setSearchInput(event.target.value);
    };

    const filteredFoods = topFoods.filter(food =>
        food.foodName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="container mx-auto">
            <h1 className='lg:text-4xl md:text-4xl text-orange-500 text-xl text-center font-tittle mt-6 mb-6'>All Foods</h1>
            <div className="mx-auto w-3/4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Food Name"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
                {filteredFoods.map(food => (
                    <div key={food._id} className="card card-compact bg-red-100 shadow-xl">
                        <figure className="h-64 w-full">
                            <img src={food.foodImage} alt={food.foodName} className="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{food.foodName}</h2>
                            <p>{food.shortDescription}</p>
                            <div className='flex justify-between'>
                                <p className='text-red-500 font-paragraph'>Category: {food.foodCategory}</p>
                                <p className='text-green-600'>Price: ${food.price}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/fooddetails/${food._id}`} className="btn btn-primary">Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFoods;
