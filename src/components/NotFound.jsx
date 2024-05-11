import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (
        <div className='flex justify-center items-center max-w-[1400px] m-auto h-[300px]'>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <h1 className='text-4xl test-purple-700 text center'>Page Not Found</h1>
            
        </div>
    );
};

export default NotFound;