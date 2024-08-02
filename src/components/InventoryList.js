import { useInventory } from "@/context/inventoryContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";

export default function InventoryList({ onEdit }) {
  const { inventory, removeItem } = useInventory();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("title-asc");

  const filteredItems = useMemo(() => {
    let filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortOrder) {
      case "title-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "quantity-asc":
        filtered.sort((a, b) => a.quantity - b.quantity);
        break;
      case "quantity-desc":
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        break;
    }

    return filtered;
  }, [inventory, searchQuery, sortOrder]);

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
      <SearchBar onSearch={setSearchQuery} onSort={setSortOrder} />
      <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
        {filteredItems.map(({ name, quantity }) => (
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
