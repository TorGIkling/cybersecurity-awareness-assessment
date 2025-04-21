import {Navigate} from "react-router-dom";
import {JSX, useContext} from "react";
import {AuthContext} from "../components/AuthProvider";
import React from "react";

function EvaluatorRoute({children}: {children: JSX.Element}) {
   const {isAuthenticated, role} = useContext(AuthContext)!;

   if(!isAuthenticated) {
         return <Navigate to="/login"/>;
   } else if(role !== "Evaluator") {
        return <Navigate to={`/`}/>;
   } else {
       return children;
   }
}
export default EvaluatorRoute;