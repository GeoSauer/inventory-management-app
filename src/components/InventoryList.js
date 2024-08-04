"use client";

import { useInventory } from "@/context/InventoryContext";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import ItemModal from "./ItemModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function InventoryList() {
  const { inventory, addItem, editItem } = useInventory();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("title-asc");
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [editing, setEditing] = useState(false);
  const [oldName, setOldName] = useState(itemName);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [image, setImage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      addItem(itemName, itemQuantity, image);
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#bdbdbd",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const renderInvRows = () => {
    return (
      <>
        {filteredItems.length > 0
          ? filteredItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <StyledTableRow key={item.name}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">
                    <Avatar variant="square" src={item.imageUrl} alt={item.name} />
                  </StyledTableCell> */}{" "}
                  {/* //TODO urls are generating but don't link to an image*/}
                  <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton size="sm" onClick={() => handleEdit(item.name, item.quantity)}>
                      <ModeEditIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
          : null}
      </>
    );
  };

  return (
    <Box
      borderRadius={"10px"}
      overflow={"hidden"}
      width={"min(45rem, 95vw)"}
      mt={isMobile ? "5rem" : "7rem"}
      mb={"2rem"}
      minHeight={"30rem"}
      backgroundColor={"#eeeeee"}
      maxHeight={"80vh"}
    >
      <Box
        width="100%"
        height="4rem"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant={isMobile ? "h5" : "h4"} color={"#333"} textAlign={"center"}>
          Inventory Items
        </Typography>
      </Box>
      <Stack>
        <SearchBar onSearch={setSearchQuery} onSort={setSortOrder} />
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
          image={image}
          setImage={setImage}
        />
      </Stack>
      <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TableContainer sx={{ maxHeight: "calc(70vh - 150px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                {/* <StyledTableCell align="right" /> */}
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>{renderInvRows()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
