import { useState, useEffect, useContext } from 'react';
import { FaPlus, FaWindowClose } from 'react-icons/fa';
import Modal from 'react-modal';
import { AuthContext } from './providers/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
Modal.setAppElement('#root');

const Gallery = () => {
    const [feedback, setFeedback] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [userFeedback, setUserFeedback] = useState('');
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure(); 

    useEffect(() => {
        axiosSecure.get('/feedback') 
            .then(response => {
                setFeedback(response.data);
            })
            .catch(error => console.error('Error fetching feedback:', error));
    }, [axiosSecure]);

    const handleMouseEnter = index => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const openModal = () => {
        if (user) {
            setModalIsOpen(true);
        } else {
            navigate('/login', { state: { from: '/gallery' } });
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = {
            displayName: user.displayName,
            imageUrl: imageUrl,
            feedback: userFeedback
        };

        axiosSecure.post('/feedback', formData) 
            .then(response => {
                console.log('inside post response', response.data);
                if (response.data.insertedId) {
                    toast.success("Feedback Added Successfully");
                    if (location.state && location.state.from) {
                        navigate(location.state.from);
                    } else {
                        navigate('/gallery');
                    }
                }
            })
            .catch(error => console.error('Error adding feedback:', error));

        setImageUrl('');
        setUserFeedback('');
        closeModal();
    };

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
           <div className="bg-white bg-opacity-50 bg-cover w-full h-54" style={{backgroundImage: "url('https://i.ibb.co/TRfPJHL/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai.jpg')"}}>
                <h1 className='font-tittle text-orange-500 text-center lg:text-8xl md:text-4xl text-xl py-24'>Gallery</h1>
            </div>


            <div>
                <button className="btn bg-orange-500 ml-4 mt-12 text-white" onClick={openModal}>
                    <FaPlus className="text-4xl hover:bg-yellow-500" />Add Feedback
                </button>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 relative mt-4">
                {feedback.map((item, index) => (
                    <div
                        key={item._id}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={item.imageUrl} alt={item.displayName} className="w-full h-auto rounded-lg" />
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-4 transition-opacity duration-300 ${
                                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <h2 className="text-xl font-bold">{item.displayName}</h2>
                            <p>{item.feedback}</p>
                           
                        </div>
                    </div>
                ))}
            </div>

            <Modal 
              isOpen={modalIsOpen} 
              onRequestClose={closeModal} 
              contentLabel="Add Feedback Modal" 
              className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
              style={{ overlay: { zIndex: 500 } }}
            >
              <div className="bg-white rounded-lg w-1/2">
                <div className="flex flex-col items-start p-4">
                  <div className="flex items-center w-full">
                    <div className="text-orange-00 font-medium text-lg font-tittle">Add Feedback</div>
                    <FaWindowClose onClick={closeModal} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" />
                  </div>
                  <form onSubmit={handleSubmit} className="w-full">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="block w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <textarea
                      placeholder="Feedback"
                      value={userFeedback}
                      onChange={(e) => setUserFeedback(e.target.value)}
                      className="block w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </Modal>

        </div>
    );
};

export default Gallery;
