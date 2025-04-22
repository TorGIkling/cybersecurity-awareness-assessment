import {Navigate} from "react-router-dom";
import {JSX, useContext} from "react";
import {AuthContext} from "../components/AuthProvider";
import React from "react";

function AdminRoute({children}: {children: JSX.Element}) {
   const {isAuthenticated, role, loading} = useContext(AuthContext)!;

   if (loading) {
         return <div>Loading...</div>;
   }
   if(!isAuthenticated) {
       return <Navigate to="/login"/>;
   } else if(role !== "Admin") {
       return <Navigate to="/"/>;
   } else {
       return children;
   }

}

export default AdminRoute;