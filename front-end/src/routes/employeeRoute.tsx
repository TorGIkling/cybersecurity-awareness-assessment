import {Navigate} from "react-router-dom";
import {JSX, useContext} from "react";
import {AuthContext} from "../components/AuthProvider";
import React from "react";

function EmployeeRoute({children}: {children: JSX.Element}) {
   const {isAuthenticated, role,loading} = useContext(AuthContext)!;

   if (loading) {
       return <div>Loading...</div>;
   }
   if (isAuthenticated && role === "Admin") {
       return <Navigate to={"/organizations"}/>;
   } else if(!isAuthenticated || (role !== "Employee" && role !== "Evaluator" && role !== "Manager")) {
         return <Navigate to="/login"/>;
   }
    return children;
}
export default EmployeeRoute;