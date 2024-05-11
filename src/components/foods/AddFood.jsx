import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';

const AddFood = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [searchInput, setSearchInput] = useState('');
    const foodCategories = [
        "Appetizers & Snacks",
        "Main Courses",
        "Desserts",
        "Beverages",
        "Salads",
        "Soups",
        "Sandwiches & Wraps",
        "Breakfast & Brunch",
        "Pastas & Noodles",
        "Rice Dishes",
        "Breads & Baked Goods",
        "Seafood",
        "Vegetarian & Vegan",
        "BBQ & Grilling",
        "International Cuisine",
        "Healthy & Light Meals",
        "Comfort Food",
        "Street Food",
        "Finger Foods",
        "Dairy & Cheese"
    ];

    const [countryInput, setCountryInput] = useState('');
    const foodOrigins = [
        "Italian",
        "Chinese",
        "Indian",
        "Japanese",
        "Mexican",
        "French",
        "Spanish",
        "Thai",
        "Greek",
        "Mediterranean",
        "American",
        "Turkish",
        "Vietnamese",
        "Korean",
        "Middle Eastern",
        "Brazilian",
        "British",
        "German",
        "Russian",
        "Caribbean"
    ];

    const handleAddFood = event => {
        event.preventDefault();
        const form = event.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodCategory = form.foodCategory.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const foodOrigin = form.foodOrigin.value;
        const shortDescription = form.shortDescription.value;
        const count = 0; 

        const foodItem = {
            foodName,
            foodImage,
            foodCategory,
            quantity,
            price,
            foodOrigin,
            shortDescription,
            count,
            addedBy: {
                name: user.displayName,
                email: user.email
            }
        };

        fetch('http://localhost:5000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })
        .then(res => res.json())
        .then(data => {
            console.log('inside post response', data);
            if (data.insertedId) {
                toast.success("Food Item Added Successfully");
                // navigate('/userfoods');
            }
        });
    }

    const handleSearchInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    return (
        <div>
            <Helmet>
                <title>Add Food Item</title>
            </Helmet>
            <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleAddFood} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium  ">Add Your Food Item</p>
                            <img src="https://i.ibb.co/f8qWJY4/OIG4-m-M0lvw5e-Lb-Jt.jpg" className="rounded-lg p-8" alt="AddFood" />
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="foodName" className="text-sm">Food Name</label>
                                <input id="foodName" name="foodName" type="text" placeholder="Enter Food Name" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="foodImage" className="text-sm">Food Image URL</label>
                                <input id="foodImage" name="foodImage" type="text" placeholder="Enter Food Image URL" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="foodCategory" className="text-sm">Food Category</label>
                                <input
                                    id="foodCategory"
                                    name="foodCategory"
                                    type="text"
                                    placeholder="Search or Select Food Category"
                                    className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300"
                                    list="foodCategories"
                                    onChange={event => handleSearchInputChange(event, setSearchInput)}
                                    value={searchInput}
                                    required
                                />
                                <datalist id="foodCategories">
                                    {foodCategories
                                        .filter(category =>
                                            category.toLowerCase().includes(searchInput.toLowerCase())
                                        )
                                        .map((category, index) => (
                                            <option key={index} value={category} />
                                        ))}
                                </datalist>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="quantity" className="text-sm">Quantity</label>
                                <input id="quantity" name="quantity" type="number" placeholder="Enter Quantity" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="price" className="text-sm">Price</label>
                                <input id="price" name="price" type="number" placeholder="Enter Price" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="foodOrigin" className="text-sm">Food Origin (Country)</label>
                                <input
                                    id="foodOrigin"
                                    name="foodOrigin"
                                    type="text"
                                    placeholder="Search or Select Food Origin"
                                    className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300"
                                    list="foodOrigins"
                                    onChange={event => handleSearchInputChange(event, setCountryInput)}
                                    value={countryInput}
                                    required
                                />
                                <datalist id="foodOrigins">
                                    {foodOrigins
                                        .filter(country =>
                                            country.toLowerCase().includes(countryInput.toLowerCase())
                                        )
                                        .map((country, index) => (
                                            <option key={index} value={country} />
                                        ))}
                                </datalist>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="shortDescription" className="text-sm">Short Description</label>
                                <textarea id="shortDescription" name="shortDescription" placeholder="Enter Short Description" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required></textarea>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="col-start-2 col-span-2 w-full p-3 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">Add</button>
                </form>
            </section>
        </div>
    );
};

export default AddFood;
