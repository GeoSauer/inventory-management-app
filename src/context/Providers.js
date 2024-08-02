import React from "react";
import { AuthProvider } from "./authContext";
import { InventoryProvider } from "./inventoryContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <InventoryProvider>{children}</InventoryProvider>
    </AuthProvider>
  );
};

export default Providers;
