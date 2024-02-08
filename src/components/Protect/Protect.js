import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function Protect({ children }) {
  const location = useLocation();
  const state = useSelector((state) => state.user.data);
  if (!state.isAuth)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return <>{children}</>;
}

export default Protect;
