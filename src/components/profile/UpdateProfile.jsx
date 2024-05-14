import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating profile: " + error.message);
      });
  };

  return (
    <div className="max-w-[1400px] m-auto h-3/4">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <h1 className="text-center text-4xl font-tittle text-orange-500 lg:mb-16">Profile</h1>
      <form onSubmit={handleSaveChanges}>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" value={name}
            onChange={(e) => setName(e.target.value)}  className="input input-bordered" />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Picture URL</span>
          </div>
          <input type="text" value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}  className="input input-bordered" />
        </label>

        <button className="btn btn-success  text-white mt-4 w-64 p-0 lg:mb-12 " type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateProfile;