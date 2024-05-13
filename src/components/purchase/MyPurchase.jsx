import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure'; 
import { useTheme } from '../Theme';


const MyPurchase = () => {
  const { darkTheme } = useTheme();

  const [userPurchases, setUserPurchases] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        const response = await axiosSecure.get(`/userpurchase/${user.email}`);
        if (!response.data) {
          throw new Error('Failed to fetch user purchases');
        }

        setUserPurchases(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching user purchases:', error);
      }
    };

    fetchData();
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

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are You Sure You Want to Delete It?",
      text: "It Can't be Revert",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/userpurchase/${_id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              setUserPurchases(prevPurchases => prevPurchases.filter(purchase => purchase._id !== _id));
              Swal.fire("Deleted!", "Your craft has been deleted.", "success");
            }
          }).catch(error => {
            console.error('Error deleting purchase:', error);
          });
      }
    });
  };

  return (
    <div>
      <h1 className="font-tittle lg:text-4xl md:text-4xl text-xl text-center text-orange-500 mt-12">My Purchases</h1>
      <table className= {` table ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
        <thead>
        <tr className={`  ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userPurchases.map((food) => (
            <tr key={food._id}  className={`  ${darkTheme ? 'hover:bg-gray-800' : ' hover:bg-base-200'}`}>
            <td>
                <img 
                  src={food.image} 
                  alt={food.foodName} 
                  className="h-36 lg:w-1/2 md:w-1/2 w-full object-cover" 
                />
              </td>
              <td>{food.foodName}</td>
              <td>${food.price}</td>
              <td><button onClick={() => handleDelete(food._id)} className="btn bg-red-600 text-white">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPurchase;
