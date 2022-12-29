import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const Authprovider = ({ children }) => {

    const [dark, SetDark] = useState(false);

    const handledark = () => {
        SetDark(!dark);
        localStorage.setItem("dark-mode", !dark);
    }

    useEffect(() => {
        if (dark) {
            document.querySelector("html").setAttribute("data-theme", "dark");
        } else {
            document.querySelector("html").setAttribute("data-theme", "tasktheme");
        }
    }, [dark])

    useEffect(() => {
        const localDark = JSON.parse(localStorage.getItem("dark-mode"));
        console.log(localDark);
        SetDark(localDark);
    }, [])






    const [user, SetUser] = useState(null);
    const [loading, SetLoading] = useState(true)
    const createUser = (email, password) => {
        SetLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const SignIn = (email, password) => {
        SetLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const LogOut = () => {
        SetLoading(true)
        return signOut(auth)
    }

    const updateUser = (userInfo) => {
        return updateProfile(user, userInfo)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            SetUser(currentUser);
            SetLoading(false)
        })
        return () => unSubscribe();
    }, [])
    const authinfo = {
        createUser,
        SignIn,
        LogOut,
        updateUser,
        handledark,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;