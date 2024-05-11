import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {

    const carouselItemStyle = {
        height: '600px', 
        objectFit: 'cover', 
    };
    
    const firstCarouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    
    const secondCarouselSettings = {
        ...firstCarouselSettings,
        vertical: false, 
        horizontal: true,
        verticalSwiping: false, 
        horizontalSwiping: true,
    };
    
    return (
        <div>
          <div className="flex  h-fit rounded-full">
            <div className="lg:w-1/4 md:w-1/4 w-1/3 h-full">
              <Slider {...firstCarouselSettings}>
                <div style={carouselItemStyle}>
                  <img src="https://i.ibb.co/hD18LMs/side-view-fried-meat-with-french-fries-ketchup.jpg" alt="Carousel Image 1" style={carouselItemStyle} />
                </div>
                <div style={carouselItemStyle}>
                  <img src="https://i.ibb.co/3sx723y/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai.jpg" alt="Carousel Image 2" style={carouselItemStyle} />
                </div>
              </Slider>
            </div>
            <div className="lg:w-2/4 md:w-2/4 w-1/3  h-[600px] flex flex-col justify-center items-center text-white bg-black lg:p-12 md:p-12 p-4">
              <h1 className="lg:text-4xl md:text-4xl text-xl font-bold mb-4 logo-font">RestoSync</h1>
              <img src="https://i.ibb.co/f8qWJY4/OIG4-m-M0lvw5e-Lb-Jt.jpg" alt="" className='lg:h-48 lg:w-48 md:h-48 md:w-48 h-24 w-24 rounded-full mb-8'/>
              <p className="text-xs text-gray-300 text-center mb-4 font-paragraph">Discover a culinary haven at RestoSync, where every craving meets convenience. Explore a world of flavors and effortlessly satisfy your appetite with our seamless food purchasing experience.</p>
              <a href="/all-foods" className="bg-green-500 text-white px-4 py-2 rounded-full lg:w-36 md:w-36 w-24 text-center hover:bg-yellow-400 transition duration-300">All Foods</a>
            </div>
            <div className="lg:w-1/4 md:w-1/4 w-1/3 h-full">
              <Slider {...secondCarouselSettings}>
                <div style={carouselItemStyle}>
                  <img src="https://i.ibb.co/XVphNZ4/grilled-chicken-legs-flaming-grill-with-grilled-vegetables-with-tomatoes-potatoes-pepper-seeds-salt.jpg" alt="Carousel Image 3" style={carouselItemStyle} />
                </div>
                <div style={carouselItemStyle}>
                  <img src="https://i.ibb.co/MSKYgPF/flame-grilled-meat-cooking-flames-generative-ai.jpg" alt="Carousel Image 4" style={carouselItemStyle} />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      );
};

export default Banner;