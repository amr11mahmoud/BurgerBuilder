import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleDrawer from "../SideDrawer/DrawerToggle/DrawerToggle";
export default function toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <ToggleDrawer clicked={props.drawerToggleClicked} />

      <Logo height="80%" />

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}
