"use client";

import { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import { makeErrorMessagesReadable } from "@/utils/misc";
import Loading from "@/components/Loading";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setError("");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/inventory");
    } catch (error) {
      setError(makeErrorMessagesReadable(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/inventory");
    } catch (error) {
      setError(makeErrorMessagesReadable(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // router.push("/auth"); //TODO circle back on logout going to landing vs auth
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    setLoading,
    error,
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>{loading ? <Loading /> : children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
