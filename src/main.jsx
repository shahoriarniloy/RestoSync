import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import PublicRoutes from './components/routes/PublicRoutes.jsx';
import PrivateRoutes from './components/routes/PrivateRoutes.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx';
import ViewProfile from './components/profile/ViewProfile.jsx';
import UpdateProfile from './components/profile/UpdateProfile.jsx';
import Main from './layout/Main.jsx';
import NotFound from './components/NotFound.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import Home from './components/Home.jsx';
import { ThemeProvider } from './components/Theme.jsx';





import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddFood from './components/foods/AddFood.jsx';
import AllFoods from './components/foods/AllFoods.jsx';
import SingleFood from './components/foods/SingleFood.jsx';
import Purchase from './components/purchase/Purchase.jsx';
import Gallery from './components/Gallery.jsx';
import UserFoods from './components/foods/UserFoods.jsx';
import UpdateFood from './components/foods/UpdateFood.jsx';
import MyPurchase from './components/purchase/MyPurchase.jsx';
import CategoryFoods from './components/foods/CategoryFoods.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<NotFound></NotFound>,
    children:[
      {
        path:'/',
        element: <Home></Home>,
      },
      {
        path:'/login',
        // element: <PublicRoutes><Login></Login></PublicRoutes>
        element: <Login></Login>



      },
     
      {
        path:'/signup',
        element: <PublicRoutes><Register></Register></PublicRoutes>
      },
      {
        path:'/profile',
        element: <PrivateRoutes><ViewProfile></ViewProfile></PrivateRoutes>
      },
      {
        path:'/updateprofile',
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
      },
      {
        path:'/foods',
        element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>
      },
      {
        path:'/allfoods',
        element: <AllFoods></AllFoods>
      },
      {
        path:'/fooddetails/:id',
        element: <SingleFood></SingleFood>,
        loader: ({ params }) => fetch(`https://resturant-pied-eta.vercel.app/fooddetails/${params.id}`)

      },
      {
        path:'/purchase/:id',
        element: <PrivateRoutes><Purchase></Purchase></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://resturant-pied-eta.vercel.app/fooddetails/${params.id}`)

      },
      {
        path:'/gallery',
        element: <Gallery></Gallery>
      },
      {
        path:'/userfoods',
        element: <PrivateRoutes><UserFoods></UserFoods></PrivateRoutes>,


      },
      {
        path:'/userfood/update/:id',
        element: <PrivateRoutes><UpdateFood></UpdateFood></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://resturant-pied-eta.vercel.app/fooddetails/${params.id}`)

      },
      {
        path:'/userpurchases/:id',
        element: <PrivateRoutes><MyPurchase></MyPurchase></PrivateRoutes>,


      },
      
      {
        path:'/categoryfoods/:categoryName',
        element: <CategoryFoods />,
      }
      

      
      



      
    

      
    
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
        <ThemeProvider>


<RouterProvider router={router} />
</ThemeProvider>

</AuthProvider>

  </React.StrictMode>,
)
