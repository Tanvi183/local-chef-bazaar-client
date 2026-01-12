import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../services/firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user registation function
  const registerUser = (email, password) => {
    setLoading(true);
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Login
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Google SignIn
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // SignOut
  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Observe auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);

      if (currentUser) {
        const loggedUser = { email: currentUser.email };
        fetch("https://local-chef-bazaar-server-flax.vercel.app/getToken", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after getting token", data);
            localStorage.setItem("token", data.token);
          });
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    registerUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    SignOut,
    user,
    loading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
