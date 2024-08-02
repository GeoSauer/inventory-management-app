"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { InventoryProvider } from "./InventoryContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <InventoryProvider>{children}</InventoryProvider>
    </AuthProvider>
  );
};

export default Providers;
