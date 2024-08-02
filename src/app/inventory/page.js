"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useInventory } from "@/context/inventoryContext";
import ItemModal from "@/components/ItemModal";
import InventoryList from "@/components/InventoryList";

export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [editing, setEditing] = useState(false);
  const [oldName, setOldName] = useState(itemName);

  const { addItem, editItem } = useInventory();

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
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      sx={{ backgroundImage: "url(/images/pantry_horizontal.jpeg)" }}
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
