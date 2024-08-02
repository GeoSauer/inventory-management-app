import { useInventory } from "@/context/inventoryContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

export default function InventoryList({ onEdit }) {
  const { inventory, removeItem } = useInventory();

  return (
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

            <Button variant="contained" onClick={() => onEdit(name, quantity)}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => removeItem(name)}>
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
