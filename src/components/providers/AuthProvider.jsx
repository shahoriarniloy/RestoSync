import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import axios from "axios";

export const AuthContext =createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile=(name,image)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL: image
        })
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)

    }

    const logOut =()=>{
        setLoading(true);
        signOut(auth);

    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email:userEmail};

            setUser(currentUser);
            console.log('observing user',currentUser);
            setLoading(false);
            if(currentUser){
                axios.post('https://resturant-pied-eta.vercel.app/jwt',loggedUser, {withCredentials:true})
                .then(res=>
                    {
                        // console.log('token response',res.data);

                    })
            }
            else{
                axios.post('https://resturant-pied-eta.vercel.app/logout',loggedUser,{
                    withCredentials:true
                } )
                .then(res=>{
                    // console.log(res.data);
                })
            }
           

                });
                return ()=>{
                    unSubscribe();
                }
    },[])
    const authInfo ={user, createUser, signInUser, logOut, updateUserProfile, loading}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes ={
    children: PropTypes.node
}
