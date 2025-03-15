import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { Backdrop, CircularProgress } from "@mui/material";

export default function ProtectedAdminRoute({ children }) {
  const { isAdmin, loading } = useContext(AuthContext);

  console.log("ProtectedAdminRoute - isAdmin:", isAdmin, "loading:", loading);

  if (loading)
    return (
      // <Backdrop
      //   open={true}
      //   sx={{ color: "#fff", zIndex: 9999 }}
      // >
      //   <CircularProgress color="inherit" />
      // </Backdrop>
      <div>Loading</div>
    );

  if (!isAdmin) {
    console.warn("Redirecting to / because isAdmin is false.");
    return <Navigate to="/" replace />;
  }

  return children;
}
