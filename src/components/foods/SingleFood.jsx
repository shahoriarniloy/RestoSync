import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";


const SingleFood = () => {
    const loadedFood = useLoaderData();
    const {user} = useContext(AuthContext)

    return (
        <div>
            <Helmet>
                <title>Food Details</title>
            </Helmet>

            <div className="card w-full bg-red-100 shadow-xl flex lg:flex-row md:flex-row sm:flex:col flex-col gap-2 lg:mt-12 md:mt-12 " data-aos="zoom-in">
                <figure><img className="lg:h-96 lg:w-auto md:h-96 md:w-auto w-full h-auto" src={loadedFood.foodImage} alt="Artwork" /></figure>
                <div className="card-body ">
                    <h2 className="card-title lg:mb-12 md:mb-12">{loadedFood.foodName}</h2>
                    <p>{loadedFood.shortDescription}</p>
                    
                    <div className="flex justify-between gap-6">
                        <p className="badge badge-outline p-4 text-sm">Category: {loadedFood.foodCategory}</p>
                        <p className="badge badge-outline p-4 text-sm">Origin: {loadedFood.foodOrigin}</p>
                    </div>

                    <div className=" flex justify-between gap-6">
                        <p className="badge badge-outline p-4 text-sm">Quantity:{loadedFood.quantity}</p>
                        <p className="badge badge-outline p-4 text-sm bg-yellow-500"><strong>Price:</strong> ${loadedFood.price}</p>
                    </div>


                   {user && user.email!=loadedFood.addedBy.email && loadedFood.quantity > 0? (<div>
                    <Link to={`/purchase/${loadedFood._id}`}><button className="btn bg-orange-500 w-full hover:bg-yellow-400 text-white" >Purchase</button></Link>
                   </div>):( <div>{!user && loadedFood.quantity > 0 ? (
                    <Link to={`/purchase/${loadedFood._id}`}><button className="btn bg-orange-500 w-full text-white  hover:bg-yellow-400" >Purchase</button></Link>
                ) : (
                        <div>
                            <p className="text-red-500 text-center ">This item is currently not available for purchase.</p>
                            <button className="btn bg-orange-500 w-full hover:bg-red-400 text-white" disabled>Purchase</button>
                        </div>
                    ) }</div>)}

{/* 
                    {user.email!=loadedFood.addedBy.email? (<div> {loadedFood.quantity > 0 ? (
                        <Link to={`/purchase/${loadedFood._id}`} className="btn bg-orange-500">Purchase</Link>
                    ) : (
                        <div>
                            <p className="text-red-500">This item is currently not available for purchase.</p>
                            <button className="btn bg-orange-500" disabled>Purchase</button>
                        </div>
                    ) }</div>):( <Link to={`/purchase/${loadedFood._id}`} className="btn bg-orange-500">Purchase</Link>)} */}



                    
                    {/* {loadedFood.quantity > 0 ? (
                        <Link to={`/purchase/${loadedFood._id}`} className="btn bg-orange-500">Purchase</Link>
                    ) : (
                        <div>
                            <p className="text-red-500">This item is currently not available for purchase.</p>
                            <button className="btn bg-orange-500" disabled>Purchase</button>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default SingleFood;
