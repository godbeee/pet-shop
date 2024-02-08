import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import classes from "./Dashboard.module.css";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function DashBoard() {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <div className={classes.container}>
        <div>
          <SideBar collapse={collapse} />
        </div>
        <div className="w-100">
          <div>
            <FaBars onClick={() => setCollapse(!collapse)} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashBoard;
