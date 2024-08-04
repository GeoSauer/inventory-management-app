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
import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useInventory } from "@/context/InventoryContext";
// import { Camera } from "react-camera-pro";

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
  image,
  setImage,
}) {
  const { removeItem } = useInventory();
  const cameraRef = useRef(null);
  // const [addImage, setAddImage] = useState(false);

  // const takePhoto = () => {
  //   if (cameraRef.current) {
  //     const photo = cameraRef.current.takePhoto();
  //     setImage(photo);
  //   }
  // };

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
              onChange={(e) => setItemName(e.target.value.toLocaleLowerCase())}
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
                <SaveIcon fontSize="inherit" />
              </IconButton>
              {editing && (
                <IconButton size="sm" onClick={() => removeItem(itemName)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </ButtonGroup>
          </Stack>
          {/* //TODO debug camera stuff further */}
          {/* {image ? (
            <Box>
              <img src={image} alt="Captured" style={{ width: "100%", borderRadius: "10px" }} />
              <Button onClick={() => setImage(null)} variant="contained" sx={{ mt: 2 }}>
                Retake Photo
              </Button>
            </Box>
          ) : (
            <Camera ref={cameraRef} aspectRatio={1 / 1} facingMode={"environment"} />
          )} */}
          {/* <Stack direction="row" spacing={2} justifyContent="flex-end"> */}
          {/* {!image && (
              <IconButton size="sm" onClick={() => setAddImage(true)}>
                <CameraAltIcon fontSize="inherit" />
              </IconButton>
            )} */}
          {/* {!image && (
              <Button onClick={takePhoto} variant="contained">
                Take Photo
              </Button>
            )} */}
          {/* <ButtonGroup>
              <IconButton size="sm" onClick={onAddItem} disabled={!itemName.trim()}>
                <SaveIcon fontSize="inherit" />
              </IconButton>
              {editing && (
                <IconButton size="sm" onClick={() => removeItem(itemName)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </ButtonGroup> */}
          {/* </Stack> */}
        </Box>
      </Modal>
    </>
  );
}
