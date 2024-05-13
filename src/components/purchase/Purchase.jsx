import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../providers/AuthProvider';
import { useLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';

const Purchase = () => {
    const loadedFood = useLoaderData();
    const { user, loading } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        foodName: '',
        price: '',
        image: '',
        quantity: 1,
        buyerName: '',
        buyerEmail: '',
        buyingDate: new Date().toISOString().slice(0, 10)
    });

    useEffect(() => {
        if (user) {
            setFormData(prevState => ({
                ...prevState,
                buyerName: user.displayName,
                buyerEmail: user.email,
                foodName: loadedFood.foodName, 
                price: loadedFood.price,
                image: loadedFood.foodImage
            }));
        }
    }, [user, loadedFood]);

    const [exceedsQuantity, setExceedsQuantity] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        if (name === 'quantity') {
            if (parseInt(value) <= 0 || isNaN(parseInt(value))) {
                setFormData({ ...formData, [name]: 1 });
            } else {
                setFormData({ ...formData, [name]: parseInt(value) });
            }
            if (parseInt(value) > loadedFood.quantity) {
                setExceedsQuantity(true);
            } else {
                setExceedsQuantity(false);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:5000/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                foodId: loadedFood._id 
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('inside post response', data);
            if (data.insertedId) {
                toast.success("Food Item Purchased Successfully");
                // navigate('/userfoods');
            }
        })
        .catch(error => {
            console.error('Error adding food item:', error);
            toast.error("Failed to add food item");
        });       
        console.log(formData);
    };

    return (
        <div>
            <Helmet>
                <title>Purchase Food</title>
            </Helmet>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-4 text-orange-500 font-tittle">Purchase Food</h1>
                <div className='flex justify-center'>
                    <img className="h-36 w-auto mb-4" src={loadedFood.foodImage} alt={loadedFood.foodName} />
                </div>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">Food Name</label>
                        <input type="text" id="foodName" name="foodName" value={loadedFood.foodName} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500" required readOnly />
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" id="price" name="price" value={loadedFood.price} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500" required readOnly />
                        </div>
                        <div className="w-1/2 ml-2">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500" required />
                            {exceedsQuantity && <p className="text-red-500">You can purchase up to {loadedFood.quantity} quantity.</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">Buyer Name</label>
                        <input type="text" id="buyerName" name="buyerName" value={formData.buyerName} className="mt-1 p-2 w-full border rounded-md focus:outline-none" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700">Buyer Email</label>
                        <input type="email" id="buyerEmail" name="buyerEmail" value={formData.buyerEmail} className="mt-1 p-2 w-full border rounded-md focus:outline-none" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="buyingDate" className="block text-sm font-medium text-gray-700">Buying Date</label>
                        <input type="text" id="buyingDate" name="buyingDate" value={formData.buyingDate} className="mt-1 p-2 w-full border rounded-md focus:outline-none" readOnly />
                    </div>
                    <button type="submit" disabled={exceedsQuantity} className={`bg-orange-500 text-white py-2 px-4 rounded-md w-full ${exceedsQuantity ? 'cursor-not-allowed opacity-50' : 'hover:bg-yellow-600 focus:outline-none focus:bg-blue-600'}`}>Purchase</button>
                </form>
            </div>
        </div>
    );
};

export default Purchase;
