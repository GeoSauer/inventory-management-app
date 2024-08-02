"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useInventory } from "@/context/InventoryContext";
import ItemModal from "@/components/ItemModal";
import InventoryList from "@/components/InventoryList";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [editing, setEditing] = useState(false);
  const [oldName, setOldName] = useState(itemName);

  const router = useRouter();
  const { addItem, editItem } = useInventory();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user]);

  const resetState = () => {
    setOpen(false);
    setEditing(false);
    setItemName("");
    setItemQuantity(1);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => resetState();

  const handleAddItem = () => {
    if (!itemName.trim()) return;

    if (editing) {
      editItem(oldName, { name: itemName, quantity: itemQuantity });
    } else {
      addItem(itemName, itemQuantity);
    }

    resetState();
  };

  const handleEdit = (editName, editQuantity) => {
    setEditing(true);
    setItemName(editName);
    setOldName(editName);
    setItemQuantity(editQuantity);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/images/pantry_horizontal.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3px)",
          zIndex: -1,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ItemModal
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        editing={editing}
        itemName={itemName}
        setItemName={setItemName}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        oldName={oldName}
        onAddItem={handleAddItem}
      />
      <InventoryList onEdit={handleEdit} />
    </Box>
  );
}
