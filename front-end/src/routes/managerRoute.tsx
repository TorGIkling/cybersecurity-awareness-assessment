import {Navigate} from "react-router-dom";
import {JSX, useContext} from "react";
import {AuthContext} from "../components/AuthProvider";
import React from "react";
function ManagerRoute({children}: {children: JSX.Element}) {
   const {isAuthenticated, role} = useContext(AuthContext)!;

   if(!isAuthenticated) {
         return <Navigate to="/login"/>;
   } else if(role !== "Manager" && role !== "Evaluator") {
        return <Navigate to={`/`}/>;
   } else {
        return children;
    }
}
export default ManagerRoute;