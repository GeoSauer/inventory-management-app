"use client";

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useInventory } from "@/context/InventoryContext";

export default function ItemModal({
  open,
  onClose,
  editing,
  itemName,
  setItemName,
  itemQuantity,
  setItemQuantity,
  onAddItem,
  onOpen,
}) {
  const { removeItem } = useInventory();

  return (
    <>
      <Button variant="contained" onClick={onOpen} sx={{ borderRadius: 0 }}>
        Add New Item
      </Button>

      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(90vw, 30rem)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" component="h2" color={"black"}>
            {editing ? "Edit Item" : "Add Item"}
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="item-name"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="item-quantity"
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              inputProps={{ min: 1 }}
            />
            <ButtonGroup>
              <IconButton size="sm" onClick={onAddItem} disabled={!itemName.trim()}>
                {editing ? <SaveIcon fontSize="inherit" /> : <AddIcon fontSize="inherit" />}
              </IconButton>
              {editing && (
                <IconButton size="sm" onClick={() => removeItem(item.name)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </ButtonGroup>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
