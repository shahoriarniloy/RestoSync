import { useState, useEffect, useContext } from 'react';
import { FaPlus, FaWindowClose } from 'react-icons/fa';
import Modal from 'react-modal';
import { AuthContext } from './providers/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

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

    useEffect(() => {
        fetch('http://localhost:5000/feedback')
            .then(response => response.json())
            .then(data => {
                setFeedback(data);
            })
            .catch(error => console.error('Error fetching feedback:', error));
    }, []);

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
            navigate('/login', { state: { from: '/gallery' } });        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        const formData = {
            displayName: user.displayName,
            imageUrl: imageUrl,
            feedback: userFeedback
        };

        fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('inside post response', data);
                if (data.insertedId) {
                    toast.success("Feedback Added Successfully");
                    if (location.state && location.state.from) {
                        navigate(location.state.from);
                    } else {
                        navigate('/gallery');
                    }
                }
            });

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

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Feedback Modal">
                <button className="float-right" onClick={closeModal}>
                    <FaWindowClose className="text-4xl text-white hover:bg-yellow-500" /><span className="text-red-500 text-xl">X </span>Close
                </button>
                <h2 className="text-center text-orange-500 font-tittle lg:mt-16">Add Feedback</h2>
                <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={user ? user.displayName : ''}
                        readOnly
                        className="block w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <textarea
                        placeholder="Feedback"
                        value={userFeedback}
                        onChange={e => setUserFeedback(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    ></textarea>
                    <button
                        type="submit"
                        className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Gallery;
