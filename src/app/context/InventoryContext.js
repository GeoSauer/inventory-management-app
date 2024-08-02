import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

const InventoryContext = createContext(undefined);

export const InventoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const addItem = async (item) => {
    if (user) {
      setLoading(true);
      try {
        const itemRef = doc(firestore, `users/${user.uid}/inventory/${item}`);
        const itemSnap = await getDoc(itemRef);
        const currentQuantity = itemSnap.exists() ? itemSnap.data().quantity || 0 : 0;
        await setDoc(itemRef, { quantity: currentQuantity + 1 }, { merge: true });
        fetchUserInventory(user.uid);
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
          const currentQuantity = itemSnap.data().quantity || 0;
          if (currentQuantity > 1) {
            await setDoc(itemRef, { quantity: currentQuantity - 1 }, { merge: true });
          } else {
            await deleteDoc(itemRef);
          }
          fetchUserInventory(user.uid);
        }
      } catch (error) {
        console.error("Error removing item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const value = { inventory, addItem, removeItem, loading };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
