"use client";

import React, { useState } from "react";
import { TextField, Stack, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function SearchBar({ onSearch, onSort }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("title-asc");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    onSort(e.target.value);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ backgroundColor: "white", p: "1rem" }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
          <MenuItem value="title-asc">Title: A-Z</MenuItem>
          <MenuItem value="title-desc">Title: Z-A</MenuItem>
          <MenuItem value="quantity-asc">Quantity: Low to High</MenuItem>
          <MenuItem value="quantity-desc">Quantity: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
