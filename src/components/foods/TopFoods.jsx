import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Theme';
import { Helmet } from 'react-helmet';



const TopFoods = () => {
    const { darkTheme } = useTheme();

    const [topFoods, setTopFoods] = useState([]);

    useEffect(() => {
        fetch('https://resturant-pied-eta.vercel.app/topfoods')
            .then(response => response.json())
            .then(data => {
                setTopFoods(data);
            })
            .catch(error => console.error('Error fetching top foods:', error));
    }, []);

    return (
        <div className={` container mx-auto ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
             <Helmet>
                <title>Top Food Item</title>
            </Helmet>
            <h1 className='lg:text-4xl md:text-4xl text-xl text-center font-tittle mt-6 mb-6 text-orange-500 divider divider-warning mt-12 mb-12'>Top Foods</h1>
            <p className="font-paragraph font-sm text-center text-yellow-500">Indulge in our top-selling delights, where taste meets tradition in every bite. From succulent steaks to exquisite pastries, experience culinary excellence curated just for you. Elevate your dining experience with our handpicked selection of crowd favorites</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
                {topFoods.map(food => (
                    <div key={food._id} className={`card card-compact shadow-xl  ${darkTheme ? ' text-white bg-gray-600 ' : ''}`} >
                        <figure className="h-64 w-full">
                            <img src={food.foodImage} alt={food.foodName} className="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{food.foodName}</h2>
                            <p className='font-paragraph'>{food.shortDescription}</p>
                            <div className='flex justify-between'>
                                <p className='text-orange-700 font-paragraph'>Category: {food.foodCategory}</p>
                                <p className='text-green-600'>Price: ${food.price}</p>
                            </div>
                            <div className="card-actions justify-end">
                            <Link to={`/fooddetails/${food._id}`} className="btn bg-orange-500  hover:bg-yellow-400 text-white">Details</Link>                            
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-8'>
                <Link to="/allfoods"><button  className="bg-orange-500 text-white p-2 w-72 text-center hover:bg-yellow-400 rounded-lg">All Foods</button></Link>
            </div>

        </div>
    );
};

export default TopFoods;
