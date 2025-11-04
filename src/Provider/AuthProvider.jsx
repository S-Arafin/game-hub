import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true)
  

  const createUser = (email,password) => {
    setLoading(true)

    return createUserWithEmailAndPassword(auth , email , password)
  }


   const signIn = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
   }
   const signInWithGoogle =() =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }
   const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
   const updateUser = (updatedData)=>{
    return updateProfile(auth.currentUser, updatedData)
   }
  const  logout = ()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setLoading(false)
    })
    return ()=>{
      unsubscribe();
    }
  })

  const authData = {
    user,
    setUser,
    createUser,
    logout,
    signIn,
    loading,
    setLoading,
    updateUser,
    signInWithGoogle,
    resetPassword
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
