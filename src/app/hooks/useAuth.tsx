import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuth = () => {
 
    const ctx = useContext(AuthContext)
    const user = ctx.user
    const loginUser=ctx.login
  return {user, loginUser };
};
