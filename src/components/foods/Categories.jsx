import  { useState, useEffect } from 'react';
import { useTheme } from '../Theme';
import { Helmet } from 'react-helmet';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Categories = () => {
    const { darkTheme } = useTheme();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://resturant-pied-eta.vercel.app/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className={`container mx-auto ${darkTheme ? 'text-white bg-black' : 'text-black bg-base'}`}>
            <Helmet>
                <title>Food Categories</title>
            </Helmet>
            <div className="lg:text-4xl md:text-4xl text-orange-500 text-xl text-center font-tittle mt-6 mb-6 divider divider-warning">
                Food Categories
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                {categories.map((category, index) => (
                    <div key={index} className={`card card-compact shadow-xl ${darkTheme ? 'text-white bg-gray-600' : ''}`}>
                        <div className="card-body flex flex-col items-center bg-orange-100">
                            <GiForkKnifeSpoon className="text-4xl mb-2" />
                            <Link to={`/categoryfoods/${category}`} className="card-title font-tittle">
                                {category}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
