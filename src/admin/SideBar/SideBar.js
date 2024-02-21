import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function SideBar({ collapse }) {
  return (
    <>
      <Sidebar collapsed={collapse} style={{ height: "100vh" }}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e !important",
                color: "#b6c8d9 !important",
              },
            },
          }}
        >
          <SubMenu icon={<FaHome />} label="Charts">
            <MenuItem icon={<FaHome />}> Pie charts </MenuItem>
            <MenuItem icon={<FaHome />}> Line charts </MenuItem>
          </SubMenu>
          <MenuItem component={<NavLink to="/admin/pets" />} icon={<FaHome />}>
            pets
          </MenuItem>
          <MenuItem component={<NavLink to="/admin/users" />} icon={<FaHome />}>
            users
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default SideBar;
