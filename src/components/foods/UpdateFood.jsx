import { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { AuthContext } from '../providers/AuthProvider';
import { useLoaderData } from "react-router-dom";


const UpdateFood = () => {
    const navigate = useNavigate();
    const loadedFood = useLoaderData();
    const { user } = useContext(AuthContext); 

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodCategory = form.foodCategory.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const foodOrigin = form.foodOrigin.value;
        const shortDescription = form.shortDescription.value;
        const addBy = {
            name: user.name, 
            email: user.email 
        };
        const updatedFood = {
            foodName,
            foodImage,
            foodCategory,
            quantity,
            price,
            foodOrigin,
            shortDescription,
            addBy
        };
        fetch(`http://localhost:5000/userpurchase/${loadedFood._id}`, {            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFood)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                toast.success("Food item updated successfully");
                navigate('/userfoods');
            })
            .catch(error => {
                toast.error("An error occurred while updating the food item");
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Update Food Item</title>
            </Helmet>
            <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Update Food Item</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <label htmlFor="foodName" className="text-sm">Food Name</label>
                                <input id="foodName" name="foodName" type="text" defaultValue={loadedFood?.foodName} placeholder="Enter Food Name" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="foodImage" className="text-sm">Food Image URL</label>
                                <input id="foodImage" name="foodImage" type="text" defaultValue={loadedFood?.foodImage} placeholder="Enter Food Image URL" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="foodCategory" className="text-sm">Food Category</label>
                                <input id="foodCategory" name="foodCategory" type="text" defaultValue={loadedFood?.foodCategory} placeholder="Enter Food Category" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="quantity" className="text-sm">Quantity</label>
                                <input id="quantity" name="quantity" type="number" defaultValue={loadedFood?.quantity} placeholder="Enter Quantity" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="price" className="text-sm">Price</label>
                                <input id="price" name="price" type="number" defaultValue={loadedFood?.price} placeholder="Enter Price" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="foodOrigin" className="text-sm">Food Origin (Country)</label>
                                <input id="foodOrigin" name="foodOrigin" type="text" defaultValue={loadedFood?.foodOrigin} placeholder="Enter Food Origin" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="shortDescription" className="text-sm">Short Description</label>
                                <textarea id="shortDescription" name="shortDescription" defaultValue={loadedFood?.shortDescription} placeholder="Enter Short Description" className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300" required></textarea>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="col-start-2 col-span-2 w-full p-3 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">Update</button>
                </form>
            </section>
        </div>
    );
};

export default UpdateFood;
