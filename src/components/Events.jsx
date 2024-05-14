import { useTheme } from './Theme';

const Events = () => {
    const { darkTheme } = useTheme();

    return (
        <div className="w-full mx-auto mt-8">
            <h1 className={`lg:text-4xl md:text-4xl text-xl text-center font-tittle text-orange-500 divider divider-warning mt-12 mb-12 `}>Events & Promotions</h1>

            <div className={`bg-white rounded-xl shadow-md overflow-hidden lg:h-fit md:h-fit max-h-[700px] ${darkTheme ? 'bg-gray-800' : ''}`}>
                <div className="md:flex">
                    <div className="md:w-1/2 h-[400px]">
                        <img src="https://i.ibb.co/mvTBDdt/2528395.jpg" alt="Event" className="w-full h-auto md:h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 h-[400px] lg:flex md:flex hidden">
                        <img src="https://i.ibb.co/fCJxB7S/bar-cafeteria-family-restaurant-interior-shooting.jpg" alt="Event" className="w-full h-auto md:h-full object-cover" />
                    </div>
                </div>
                <div className="md:flex md:justify-center">
                    <div className="md:w-2/3">
                        <h2 className="text-xl font-semibold mb-2 mt-4 text-yellow-300">Grand Opening Celebration!</h2>
                        <p className="text-gray-600 mb-4 font-paragraph">Join us for the grand opening of our new restaurant! Experience our delicious menu, crafted with care by our talented chefs. Enjoy live music, special discounts, and giveaways throughout the day.</p>
                        <p className="text-blue-600">Date: 22 SEPT at 10 AM</p>
                        <p className="text-orange-600 mb-12">Location: 123 Main Street, New York, NY 10001</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
