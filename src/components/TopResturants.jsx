
const TopResturants = () => {
    return (
        <div className="">
            <h1 className='lg:text-4xl md:text-4xl text-xl text-center font-tittle mt-6 mb-6 text-orange-500 divider divider-warning mt-12 mb-12'>Chef's Corner</h1>
            <p className="font-paragraph font-sm text-center text-yellow-500 mb-12">Embark on a gastronomic journey with us as we unveil the world's culinary gems. Explore a diverse array of top-rated restaurants handpicked by our experts, promising a symphony of flavors and ambiance. Let us guide you to unforgettable dining experiences, where every meal is a celebration of taste and culture.</p>
            <div className="flex lg:flex-row md:flex-row flex-col justify-around">
            <div className="card card-compact flex-row justify-center items-center lg:w-1/2 md:w-1/2 w-full">
                <div className="card-body">
                <h2 className="card-title font-tittle text-yellow-300 shadow-orange-500 font-xl">Hav & Mar</h2>
                <p className="font-paragraph font-sm">NYC</p>

                

                <iframe
                    width="100%"
                    height="315"

                    src="https://www.youtube.com/embed/UsD1MhKBmD4?si=jJNQ-o82xa7G0m10"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <p className="font-tittle text-sm">A Day With the Executive Chef at NYC’s Hottest Seafood Restaurant </p>
                <p className="font-paragraph">“I’ve always wanted to create a space where people like me can just come in and focus on their craft. It's a seafood forward restaurant told through the lens of a lot of Ethiopian recipes where I could cook my food from my culture. It's a huge source of pride for me.”</p>
                </div>
               
                </div>

                <div className="card card-compact flex-row justify-center items-center lg:w-1/2 md:w-1/2 w-full">
                <div className="card-body">
                <h2 className="card-title font-tittle text-yellow-300 shadow-orange-500 font-xl">Chez Panisse</h2>
                <p className="font-paragraph font-sm">Berkeley, California</p>

                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/67M1c8cpbvg?si=dVxMAhF7AemRXzmz"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <p className="font-tittle text-sm">A Day with the Sous Chef at One of America's Most Influential Restaurants </p>
                <p className="font-paragraph">“As a sous chef, I'll teach interns and new cooks all of our techniques that I've been taught. Because it's not just us, it's 50 years of Chez Panisse.” Ann Cromley, sous chef at Chez Panisse in Berkeley, California, brings you along for an entire day of behind the scenes prep and service at one of America’s preeminent farm-to-table restaurants. 

</p>
                </div>
               
                </div>
                
            </div>
        </div>
    );
};

export default TopResturants;
