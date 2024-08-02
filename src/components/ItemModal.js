import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React from "react";

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
  return (
    <>
      <Button variant="contained" onClick={onOpen}>
        Add New Item
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"}>
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
            <Button variant="outlined" onClick={onAddItem} disabled={!itemName.trim()}>
              {editing ? "Save" : "Add"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
