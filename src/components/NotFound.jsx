import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (
        <div className='flex justify-center items-center max-w-[1400px] m-auto h-[300px]'>
            <Helmet>
                <title>Not Found</title>
            </Helmet>

            <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h1 className='text-4xl test-purple-700 text center'>Page Not Found</h1>
            </div>
            
        </div>
    );
};

export default NotFound;