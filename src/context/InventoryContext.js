"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "@/app/firebase";
import Loading from "@/components/Loading";

const InventoryContext = createContext(undefined);

export const InventoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserInventory(user.uid);
    }
  }, [user]);

  const fetchUserInventory = async (userUid) => {
    setLoading(true);
    try {
      const userInventoryRef = collection(firestore, `users/${userUid}/inventory`);
      const snapshot = await getDocs(userInventoryRef);
      const items = snapshot.docs.map((doc) => ({
        name: doc.id,
        ...doc.data(),
      }));
      setInventory(items);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item, quantity) => {
    if (user) {
      setLoading(true);
      try {
        const itemRef = doc(firestore, `users/${user.uid}/inventory/${item}`);
        const itemSnap = await getDoc(itemRef);
        const currentQuantity = itemSnap.exists() ? itemSnap.data().quantity || 0 : 0;
        await setDoc(itemRef, { quantity: currentQuantity + quantity }, { merge: true });
        await fetchUserInventory(user.uid);
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeItem = async (item) => {
    if (user) {
      setLoading(true);
      try {
        const itemRef = doc(firestore, `users/${user.uid}/inventory/${item}`);
        const itemSnap = await getDoc(itemRef);
        if (itemSnap.exists()) {
          await deleteDoc(itemRef);
          await fetchUserInventory(user.uid);
        }
      } catch (error) {
        console.error("Error removing item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const editItem = async (item, updatedData) => {
    if (user) {
      setLoading(true);
      try {
        const itemRef = doc(firestore, `users/${user.uid}/inventory/${item}`);
        const itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
          const currentData = itemSnap.data();

          if (currentData.name !== updatedData.name) {
            const newItemRef = doc(firestore, `users/${user.uid}/inventory/${updatedData.name}`);
            await setDoc(newItemRef, updatedData);

            await deleteDoc(itemRef);
          } else {
            if (currentData.quantity !== updatedData.quantity) {
              await setDoc(itemRef, { quantity: updatedData.quantity }, { merge: true });
            }
          }

          await fetchUserInventory(user.uid);
        }
      } catch (error) {
        console.error("Error editing item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const value = { inventory, addItem, removeItem, editItem, loading };

  return (
    <InventoryContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
