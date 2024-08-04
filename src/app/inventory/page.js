"use client";

import { useEffect } from "react";
import { Box } from "@mui/material";
import InventoryList from "@/components/InventoryList";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Inventory() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/images/pantry_horizontal.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3px)",
          zIndex: -1,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InventoryList />
    </Box>
  );
}
