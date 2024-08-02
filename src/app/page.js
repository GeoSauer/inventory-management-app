"use client";

import { useState, useEffect } from "react";
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const user = useAuth();
  const router = useRouter();

  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        updateInventory();
      } else {
        router.push("/auth");
      }
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateInventory = async () => {
    if (!user) return;
    try {
      const items = await fetchUserInventory(user.uid);
      setInventory(items);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleAddItem = (item) => {
    if (user) {
      addItemForUser(item, user.uid).then(() => updateInventory());
    }
  };

  const handleRemoveItem = (item) => {
    if (user) {
      removeItem(item, user.uid).then(() => updateInventory());
    }
  };
  const fetchUserInventory = async (userUid) => {
    const userInventoryRef = collection(firestore, `users/${userUid}/inventory`);
    const snapshot = await getDocs(userInventoryRef);
    const items = snapshot.docs.map((doc) => ({
      name: doc.id,
      ...doc.data(),
    }));

    return items;
  };

  const addItemForUser = async (item, userUid) => {
    try {
      if (!userUid) throw new Error("User UID is not defined");

      const itemRef = doc(firestore, `users/${userUid}/inventory/${item}`);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        const currentQuantity = itemSnap.data().quantity || 0;
        await setDoc(itemRef, { quantity: currentQuantity + 1 }, { merge: true });
      } else {
        await setDoc(itemRef, { quantity: 1 });
      }
    } catch (error) {
      console.error("Error adding item for user:", error);
    }
  };

  const removeItem = async (item, userUid) => {
    try {
      if (!userUid) throw new Error("User UID is not defined");

      const itemRef = doc(firestore, `users/${userUid}/inventory/${item}`);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        const currentQuantity = itemSnap.data().quantity || 0;
        if (currentQuantity > 1) {
          await setDoc(itemRef, { quantity: currentQuantity - 1 }, { merge: true });
        } else {
          await deleteDoc(itemRef);
        }
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Button onClick={handleSignOut}>X</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                handleAddItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={5}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => handleRemoveItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
