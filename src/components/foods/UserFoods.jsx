import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure'; 

const UserFoods = () => {
  const [userFoods, setUserFoods] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    if (!user) return; 

    axiosSecure.get(`/userfoods/${user.email}`) 
      .then(response => {
        if (!response.data) {
          throw new Error('Failed to fetch user foods');
        }
        setUserFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching user foods:', error);
      });
  }, [user, axiosSecure]); 

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
                  className="h-36 lg:w-1/2 md:w-1/2 w-full object-cover" 
                />
              </td>
              <td>{food.foodName}</td>
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
