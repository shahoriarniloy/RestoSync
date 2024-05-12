import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const MyPurchase = () => {
  const [userPurchases, setUserPurchases] = useState([]);
  const { user, loading } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return; 

        const response = await fetch(`http://localhost:5000/userpurchase/${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user purchases');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setUserPurchases(data);
        } else if (typeof data === 'object' && data !== null) {
          setUserPurchases([data]);
        } else {
          console.error('Data received from server is not valid:', data);
          setUserPurchases([]); 
        }
      } catch (error) {
        console.error('Error fetching user purchases:', error);
      }
    };

    fetchData();
  }, [user]); 

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
    console.log(_id);
    Swal.fire({
        title: "Are You Sure You Want to Delete It?",
        text: "It Can't be Revert",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/userpurchase/${_id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        userPurchases((prevPurchase) =>
                            prevPurchase.filter((purchase) => purchase._id !== _id)
                        ); 
                        Swal.fire("Deleted!", "Your craft has been deleted.", "success");
                    }
                });

        }
    });
};


  return (
    <div>
      <h1 className="font-tittle lg:text-4xl md:text-4xl text-xl text-center text-orange-500 mt-12">My Purchases</h1>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userPurchases.map((food) => (
            <tr key={food._id} className="hover">
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
