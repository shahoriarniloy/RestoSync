import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';

const UserFoods = () => {
  const [userFoods, setUserFoods] = useState([]);
  const { user, loading } = useContext(AuthContext);
  
  useEffect(() => {
    fetch('http://localhost:5000/userfoods/niloyshahoriar@gmail.com')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user foods');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setUserFoods(data);
        } else if (typeof data === 'object' && data !== null) {
          setUserFoods([data]);
        } else {
          console.error('Data received from server is not valid:', data);
          setUserFoods([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching user foods:', error);
      });
  }, []); 

  if (loading) {
    return (
      <div className='flex flex-row justify-center items-center'>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-tittle lg:text-4xl md:text-4xl text-xl text-center text-orange-500 mt-12">User Foods</h1>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {userFoods.map((food) => (
            <tr key={food._id} className="hover">
                <td>
                <img 
                    src={food.foodImage} 
                    alt={food.foodName} 
                    className="h-36 w-1/2 object-cover" 
                />
                </td>
              <td>{food.foodName}</td>
              <td>{food.shortDescription
}</td>
              <td>${food.price}</td>
              <td><Link to={`/userfood/update/${food._id}`} className="btn btn-warning">Update</Link></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFoods;
