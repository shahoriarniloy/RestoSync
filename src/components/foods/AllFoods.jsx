import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Theme';



const AllFoods = () => {
    const { darkTheme } = useTheme();

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
        <div className={` container mx-auto ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
            <div className=" lg:text-4xl md:text-4xl text-orange-500 text-xl text-center font-tittle mt-6 mb-6">All Foods</div>
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
                    <div key={food._id} className={`card card-compact shadow-xl  ${darkTheme ? ' text-white bg-gray-600 ' : ''}`}>
                        <figure className="h-64 w-full">
                            <img src={food.foodImage} alt={food.foodName} className="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-tittle">{food.foodName}</h2>
                            {food.quantity === 0 ? (
                                <p className='btn w-full text-white bg-red-500 border-none '>Not Available</p>
                                ) : (
                                <p className='btn w-full text-white border-none bg-green-600 font-paragraph'>Available:<span className='font-tittle text-lg font-bold'>{food.quantity}</span> </p>
                                )}
                            <p>{food.shortDescription}</p>
                            <div className='flex justify-between'>
                                <p className='btn text-blue-600 font-paragraph mr-2'>Category: {food.foodCategory}</p>
                                <p className='btn text-pink-600 mr-2'>Price: ${food.price}</p>
                               

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
